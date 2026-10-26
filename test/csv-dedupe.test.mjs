import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parseCsv, toDate } from '../lib/csv.mjs'

const sample = (n) => readFileSync(new URL(`../samples/${n}`, import.meta.url), 'utf8')
const mod = (n) => import(`../src/${n}.mjs`)

test('02 dédoublonnage : casse et accents ignorés', async () => {
  const { dedupe } = await mod('csv-dedupe')
  const { kept, removed } = dedupe(parseCsv(sample('clients.csv')).records, ['email', 'telephone'])
  assert.equal(removed.length, 1)
  assert.equal(removed[0].nom, 'AMA KOFFI')
  assert.equal(kept.length, 4)
})
