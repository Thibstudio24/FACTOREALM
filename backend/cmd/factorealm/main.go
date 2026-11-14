package main

import (
	"fmt"
	"io"
	"os"
)

const developmentVersion = "dev"

const usage = `Factorealm — socle technique

Utilisation :
  factorealm version
  factorealm help

Aucune fonction métier n'est disponible dans ce premier lot.
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
	default:
		fmt.Fprintf(
			stderr,
			"Erreur : commande inconnue %q. Utilisez « help ».\n",
			args[0],
		)
		return 2
	}
}

func writeOutput(stdout io.Writer, stderr io.Writer, text string) int {
	if _, err := io.WriteString(stdout, text); err != nil {
		fmt.Fprintln(stderr, "Erreur : impossible d'écrire la sortie.")
		return 1
	}

	return 0
}
