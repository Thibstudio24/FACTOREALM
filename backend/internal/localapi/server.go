package localapi

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"strconv"
	"time"
)

const (
	readHeaderTimeout = 5 * time.Second
	readTimeout       = 10 * time.Second
	writeTimeout      = 10 * time.Second
	idleTimeout       = 30 * time.Second
	shutdownTimeout   = 5 * time.Second
	maxHeaderBytes    = 16 * 1024
)

const healthBody = "{\"status\":\"ok\"}\n"

func newHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		w.Header().Set("X-Content-Type-Options", "nosniff")

		if r.URL.Path != "/healthz" {
			http.NotFound(w, r)
			return
		}

		if r.Method != http.MethodGet {
			w.Header().Set("Allow", http.MethodGet)
			http.Error(
				w,
				"Méthode non autorisée.",
				http.StatusMethodNotAllowed,
			)
			return
		}

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusOK)

		// La réponse ne déclenche aucun effet métier à annuler
		// si le client se déconnecte pendant son écriture.
		_, _ = io.WriteString(w, healthBody)
	})
}

func newServer() *http.Server {
	return &http.Server{
		Handler:           newHandler(),
		ReadHeaderTimeout: readHeaderTimeout,
		ReadTimeout:       readTimeout,
		WriteTimeout:      writeTimeout,
		IdleTimeout:       idleTimeout,
		MaxHeaderBytes:    maxHeaderBytes,
	}
}

// Run démarre une API sur la boucle locale IPv4 et attend son arrêt.
// Le port 0 laisse le système choisir un port libre pour les tests.
// L'adresse d'écoute n'est volontairement pas configurable.
func Run(ctx context.Context, port uint16, output io.Writer) error {
	if err := ctx.Err(); err != nil {
		return err
	}

	address := net.JoinHostPort("127.0.0.1", strconv.Itoa(int(port)))

	listener, err := net.Listen("tcp4", address)
	if err != nil {
		return fmt.Errorf("écoute sur %s impossible : %w", address, err)
	}
	defer listener.Close()

	if _, err := fmt.Fprintf(
		output,
		"API technique locale : http://%s\n",
		listener.Addr().String(),
	); err != nil {
		return fmt.Errorf("affichage de l'adresse impossible : %w", err)
	}

	server := newServer()
	defer server.Close()

	serveResult := make(chan error, 1)

	go func() {
		serveResult <- server.Serve(listener)
	}()

	select {
	case err := <-serveResult:
		return normalizeServeError(err)

	case <-ctx.Done():
		shutdownContext, cancel := context.WithTimeout(
			context.Background(),
			shutdownTimeout,
		)
		defer cancel()

		shutdownErr := server.Shutdown(shutdownContext)
		if shutdownErr != nil {
			// Après expiration du délai, fermer les connexions restantes.
			_ = server.Close()
		}

		serveErr := <-serveResult

		if shutdownErr != nil {
			return fmt.Errorf("arrêt contrôlé impossible : %w", shutdownErr)
		}

		return normalizeServeError(serveErr)
	}
}

func normalizeServeError(err error) error {
	if err == nil || errors.Is(err, http.ErrServerClosed) {
		return nil
	}

	return fmt.Errorf("service HTTP interrompu : %w", err)
}
