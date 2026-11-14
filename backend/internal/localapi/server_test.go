package localapi

import (
	"context"
	"errors"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestHandler(t *testing.T) {
	tests := []struct {
		name        string
		method      string
		path        string
		wantStatus  int
		wantAllow   string
		wantHealthy bool
	}{
		{
			name:        "sante",
			method:      http.MethodGet,
			path:        "/healthz",
			wantStatus:  http.StatusOK,
			wantHealthy: true,
		},
		{
			name:       "route inconnue",
			method:     http.MethodGet,
			path:       "/unknown",
			wantStatus: http.StatusNotFound,
		},
		{
			name:       "sous-route refusee",
			method:     http.MethodGet,
			path:       "/healthz/extra",
			wantStatus: http.StatusNotFound,
		},
		{
			name:       "post refuse",
			method:     http.MethodPost,
			path:       "/healthz",
			wantStatus: http.StatusMethodNotAllowed,
			wantAllow:  http.MethodGet,
		},
		{
			name:       "head non pris en charge",
			method:     http.MethodHead,
			path:       "/healthz",
			wantStatus: http.StatusMethodNotAllowed,
			wantAllow:  http.MethodGet,
		},
	}

	handler := newHandler()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			request := httptest.NewRequest(tt.method, tt.path, nil)
			recorder := httptest.NewRecorder()

			handler.ServeHTTP(recorder, request)

			if recorder.Code != tt.wantStatus {
				t.Errorf(
					"statut = %d ; attendu = %d",
					recorder.Code,
					tt.wantStatus,
				)
			}

			if got := recorder.Header().Get("Cache-Control"); got != "no-store" {
				t.Errorf("Cache-Control = %q ; attendu = no-store", got)
			}

			if got := recorder.Header().Get("X-Content-Type-Options"); got != "nosniff" {
				t.Errorf("X-Content-Type-Options = %q ; attendu = nosniff", got)
			}

			if got := recorder.Header().Get("Allow"); got != tt.wantAllow {
				t.Errorf("Allow = %q ; attendu = %q", got, tt.wantAllow)
			}

			if tt.wantHealthy {
				if got := recorder.Body.String(); got != healthBody {
					t.Errorf("corps = %q ; attendu = %q", got, healthBody)
				}

				wantType := "application/json; charset=utf-8"
				if got := recorder.Header().Get("Content-Type"); got != wantType {
					t.Errorf("Content-Type = %q ; attendu = %q", got, wantType)
				}
			}
		})
	}
}

func TestServerConfiguration(t *testing.T) {
	server := newServer()

	if server.ReadHeaderTimeout != 5*time.Second {
		t.Error("ReadHeaderTimeout inattendu")
	}
	if server.ReadTimeout != 10*time.Second {
		t.Error("ReadTimeout inattendu")
	}
	if server.WriteTimeout != 10*time.Second {
		t.Error("WriteTimeout inattendu")
	}
	if server.IdleTimeout != 30*time.Second {
		t.Error("IdleTimeout inattendu")
	}
	if server.MaxHeaderBytes != 16*1024 {
		t.Error("MaxHeaderBytes inattendu")
	}
}

func TestRunCanceledBeforeStart(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	err := Run(ctx, 0, io.Discard)

	if !errors.Is(err, context.Canceled) {
		t.Fatalf("erreur = %v ; attendu = context.Canceled", err)
	}
}

func TestRunPortAlreadyUsed(t *testing.T) {
	listener, err := net.Listen("tcp4", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	defer listener.Close()

	port := uint16(listener.Addr().(*net.TCPAddr).Port)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = Run(ctx, port, io.Discard)

	if err == nil {
		t.Fatal("une erreur était attendue pour un port déjà occupé")
	}

	if !strings.Contains(err.Error(), "écoute sur") {
		t.Fatalf("erreur inattendue : %v", err)
	}
}

type failingOutput struct{}

func (failingOutput) Write(p []byte) (int, error) {
	return 0, errors.New("échec d'écriture simulé")
}

func TestRunOutputFailure(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := Run(ctx, 0, failingOutput{})

	if err == nil || !strings.Contains(err.Error(), "affichage de l'adresse") {
		t.Fatalf("erreur inattendue : %v", err)
	}
}

type announcementWriter struct {
	messages chan string
}

func (w announcementWriter) Write(p []byte) (int, error) {
	w.messages <- string(p)
	return len(p), nil
}

func TestRunLifecycle(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	messages := make(chan string, 1)
	result := make(chan error, 1)

	go func() {
		result <- Run(ctx, 0, announcementWriter{messages: messages})
	}()

	var announcement string

	select {
	case announcement = <-messages:
	case err := <-result:
		t.Fatalf("arrêt avant annonce : %v", err)
	case <-time.After(5 * time.Second):
		t.Fatal("aucune adresse annoncée dans le délai imparti")
	}

	const prefix = "API technique locale : "

	if !strings.HasPrefix(announcement, prefix) {
		t.Fatalf("annonce inattendue : %q", announcement)
	}

	baseURL := strings.TrimSpace(strings.TrimPrefix(announcement, prefix))

	if !strings.HasPrefix(baseURL, "http://127.0.0.1:") {
		t.Fatalf("adresse non locale inattendue : %q", baseURL)
	}

	transport := &http.Transport{
		Proxy: nil,
	}
	defer transport.CloseIdleConnections()

	client := &http.Client{
		Transport: transport,
		Timeout:   5 * time.Second,
	}

	response, err := client.Get(baseURL + "/healthz")
	if err != nil {
		t.Fatalf("requête locale impossible : %v", err)
	}

	body, readErr := io.ReadAll(response.Body)
	closeErr := response.Body.Close()

	if readErr != nil {
		t.Fatalf("lecture de réponse impossible : %v", readErr)
	}
	if closeErr != nil {
		t.Fatalf("fermeture de réponse impossible : %v", closeErr)
	}

	if response.StatusCode != http.StatusOK {
		t.Errorf("statut = %d ; attendu = 200", response.StatusCode)
	}

	if string(body) != healthBody {
		t.Errorf("corps = %q ; attendu = %q", string(body), healthBody)
	}

	cancel()

	select {
	case err := <-result:
		if err != nil {
			t.Fatalf("erreur à l'arrêt : %v", err)
		}
	case <-time.After(10 * time.Second):
		t.Fatal("le serveur ne s'est pas arrêté dans le délai imparti")
	}
}
