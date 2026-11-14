package main

import (
	"bytes"
	"errors"
	"strings"
	"testing"
)

func TestRun(t *testing.T) {
	tests := []struct {
		name       string
		args       []string
		wantCode   int
		wantOutput string
		wantError  string
	}{
		{
			name:       "sans argument",
			wantCode:   0,
			wantOutput: usage,
		},
		{
			name:       "aide",
			args:       []string{"help"},
			wantCode:   0,
			wantOutput: usage,
		},
		{
			name:       "aide courte",
			args:       []string{"-h"},
			wantCode:   0,
			wantOutput: usage,
		},
		{
			name:       "aide longue",
			args:       []string{"--help"},
			wantCode:   0,
			wantOutput: usage,
		},
		{
			name:       "version",
			args:       []string{"version"},
			wantCode:   0,
			wantOutput: "Factorealm dev\n",
		},
		{
			name:      "commande inconnue",
			args:      []string{"inconnue"},
			wantCode:  2,
			wantError: "commande inconnue",
		},
		{
			name:      "arguments supplémentaires",
			args:      []string{"version", "extra"},
			wantCode:  2,
			wantError: "une seule commande",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var stdout bytes.Buffer
			var stderr bytes.Buffer

			code := run(tt.args, &stdout, &stderr)

			if code != tt.wantCode {
				t.Errorf("code = %d ; attendu = %d", code, tt.wantCode)
			}

			if stdout.String() != tt.wantOutput {
				t.Errorf(
					"sortie = %q ; attendue = %q",
					stdout.String(),
					tt.wantOutput,
				)
			}

			if tt.wantError == "" {
				if stderr.Len() != 0 {
					t.Errorf("erreur inattendue : %q", stderr.String())
				}
			} else if !strings.Contains(stderr.String(), tt.wantError) {
				t.Errorf(
					"erreur = %q ; doit contenir %q",
					stderr.String(),
					tt.wantError,
				)
			}
		})
	}
}

type failingWriter struct{}

func (failingWriter) Write(p []byte) (int, error) {
	return 0, errors.New("échec d'écriture simulé")
}

func TestRunOutputFailure(t *testing.T) {
	var stderr bytes.Buffer

	code := run([]string{"version"}, failingWriter{}, &stderr)

	if code != 1 {
		t.Errorf("code = %d ; attendu = 1", code)
	}

	if !strings.Contains(stderr.String(), "impossible d'écrire la sortie") {
		t.Errorf("message d'erreur inattendu : %q", stderr.String())
	}
}
