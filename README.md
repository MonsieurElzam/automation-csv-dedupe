# automation-csv-dedupe

**Dédoublonnage de CSV** — Supprime les doublons selon une ou plusieurs colonnes, en ignorant la casse, les accents et les espaces.

> **EN** — *CSV de-duplication.* Removes duplicates on one or more columns, ignoring case, accents and whitespace.

Node.js 18+, **aucune dépendance**, licence **MIT**. Aucune donnée n'est envoyée nulle part. Les messages affichés sont en français.

## Utilisation

```bash
node src/csv-dedupe.mjs clients.csv --keys email,telephone
```

Des fichiers d'exemple sont fournis dans `samples/`.

Aide intégrée (`--help`) :

```text
Usage : node src/csv-dedupe.mjs entree.csv --keys "email,telephone" [--out sortie.csv]
Compare sans tenir compte de la casse, des accents ni des espaces.
Sans --out, le résultat est écrit sur la sortie standard.
```

## Tests

```bash
npm test
```

## Limites

- Les exemples de `samples/` sont fictifs ; adaptez les en-têtes de colonnes à vos propres exports.
- Essayez d'abord sur une copie de vos données.
- Fourni tel quel, sans garantie (voir `LICENSE`).

## La série

Ce script fait partie d'une série de **scripts d'automatisation libres** (public : qualité de données, entre autres) : [présentation, guides et archive complète](https://monsieurelzam.com/scripts) · [tous les dépôts](https://github.com/MonsieurElzam?tab=repositories&q=automation-).

---

Par [Elzam MAMAH](https://monsieurelzam.com) — business analyst, optimisation de processus. Licence MIT.
