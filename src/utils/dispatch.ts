// Formatting helpers for dispatches, plates and the edition line.
// Carried over from v1 (postmarkDate, dispatchNumber, longDate, readMinutes).

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

const toDate = (value: string | Date) => (value instanceof Date ? value : new Date(value))

/** Postmark lines: { date: "APR 30", year: "2025" }. UTC so SSG output is stable. */
export function postmarkDate(value: string | Date) {
  const d = toDate(value)
  return {
    date: `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, '0')}`,
    year: String(d.getUTCFullYear()),
  }
}

/** "0430" — month + day, used as the dispatch number. */
export function dispatchNumber(value: string | Date) {
  const d = toDate(value)
  return `${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`
}

/** "Saturday, October 17, 2026" — the edition line date. */
export function editionDate(value: string | Date) {
  return toDate(value).toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Minutes to read at ~200 words per minute (minimum 1). */
export function readMinutes(markdown: string) {
  const words = markdown.replace(/^---[\s\S]*?---/, '').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/** "No. 02" */
export function ordinalLabel(n: number) {
  return `No. ${String(n).padStart(2, '0')}`
}

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

/** 4 → "IV" */
export function toRoman(n: number) {
  let rest = Math.max(0, Math.floor(n))
  let out = ''
  for (const [value, numeral] of ROMAN) {
    while (rest >= value) {
      out += numeral
      rest -= value
    }
  }
  return out
}

const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']

/** 5 → "Five" (falls back to digits past twelve). */
export function numberWord(n: number) {
  return WORDS[n] ?? String(n)
}

/** Last segment of a content `path` — "/projects/fieldwork" → "fieldwork". */
export function slugOf(path: string) {
  return path.split('/').filter(Boolean).pop() ?? ''
}

/** "October 17, 2026" — the "Last updated" line. UTC so SSG output is stable. */
export function longDate(value: string | Date) {
  return toDate(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
