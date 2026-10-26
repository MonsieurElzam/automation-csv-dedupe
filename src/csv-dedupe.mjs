#!/usr/bin/env node
/* Supprime les doublons d'un CSV selon une ou plusieurs colonnes clés. */
import { readFileSync, writeFileSync } from 'node:fs'
import { parseCsv, toCsv } from '../lib/csv.mjs'
import { isMain, parseArgs, usage, fail } from '../lib/cli.mjs'

const normalise = (v) => String(v ?? '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Garde la première occurrence de chaque clé ; renvoie aussi les lignes écartées. */
export function dedupe(records, keys) {
  const seen = new Set()
  const kept = []
  const removed = []
  for (const r of records) {
    const k = keys.map((c) => normalise(r[c])).join('\u0001')
    if (seen.has(k)) removed.push(r)
    else { seen.add(k); kept.push(r) }
  }
  return { kept, removed }
}

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), ['help'])
  usage(`
Usage : node src/csv-dedupe.mjs entree.csv --keys "email,telephone" [--out sortie.csv]
Compare sans tenir compte de la casse, des accents ni des espaces.
Sans --out, le résultat est écrit sur la sortie standard.`, args, 1)
  if (!args.keys) fail('--keys est obligatoire (colonnes séparées par des virgules).')
  const { headers, records } = parseCsv(readFileSync(args._[0], 'utf8'))
  const keys = args.keys.split(',').map((k) => k.trim())
  const missing = keys.filter((k) => !headers.includes(k))
  if (missing.length) fail(`colonne(s) introuvable(s) : ${missing.join(', ')}`)
  const { kept, removed } = dedupe(records, keys)
  const csv = toCsv(headers, kept)
  if (args.out) writeFileSync(args.out, csv); else process.stdout.write(csv)
  console.error(`${records.length} lignes lues, ${removed.length} doublon(s) supprimé(s), ${kept.length} conservée(s).`)
}
