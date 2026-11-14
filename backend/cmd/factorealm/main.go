package main

import (
	"context"
	"fmt"
	"io"
	"os"
	"os/signal"

	"github.com/Thibstudio24/FACTOREALM/backend/internal/localapi"
)

const developmentVersion = "dev"

const usage = `Factorealm — socle technique

Utilisation :
  factorealm version
  factorealm help
  factorealm serve

La commande serve démarre une API technique sur 127.0.0.1:8080.
Utilisez Ctrl+C pour l'arrêter.

Aucune fonction métier n'est disponible dans ce premier socle.
`

func main() {
	os.Exit(run(os.Args[1:], os.Stdout, os.Stderr))
}

func run(args []string, stdout io.Writer, stderr io.Writer) int {
	if len(args) == 0 {
		return writeOutput(stdout, stderr, usage)
	}

	if len(args) != 1 {
		fmt.Fprintln(stderr, "Erreur : une seule commande est acceptée.")
		return 2
	}

	switch args[0] {
	case "help", "-h", "--help":
		return writeOutput(stdout, stderr, usage)
	case "version":
		return writeOutput(
			stdout,
			stderr,
			"Factorealm "+developmentVersion+"\n",
		)
	case "serve":
		return runServer(stdout, stderr)
	default:
		fmt.Fprintf(
			stderr,
			"Erreur : commande inconnue %q. Utilisez « help ».\n",
			args[0],
		)
		return 2
	}
}

func runServer(stdout io.Writer, stderr io.Writer) int {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	if err := localapi.Run(ctx, 8080, stdout); err != nil {
		fmt.Fprintf(stderr, "Erreur serveur : %v\n", err)
		return 1
	}

	return writeOutput(stdout, stderr, "Serveur arrêté.\n")
}

func writeOutput(stdout io.Writer, stderr io.Writer, text string) int {
	if _, err := io.WriteString(stdout, text); err != nil {
		fmt.Fprintln(stderr, "Erreur : impossible d'écrire la sortie.")
		return 1
	}

	return 0
}
