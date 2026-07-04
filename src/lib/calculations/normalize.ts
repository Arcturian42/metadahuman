/**
 * Name normalization for Pythagorean letter-mapping.
 *
 * The A–Z letter table only defines unaccented Latin letters. Real users submit
 * accented names (Sophie, François, Zoë, Renée…). Per docs/numerology-reference.md §1
 * and CLAUDE.md non-negotiable #6, every letter-based calculation MUST normalize first:
 *   1. Unicode NFD + strip combining diacritics (é→e, ñ→n, ç→c, ü→u…)
 *   2. Uppercase
 *   3. Keep A–Z only (drop spaces, hyphens, apostrophes, digits — don't map or error)
 */
export function normalizeName(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining diacritical marks
    .toUpperCase()
    .replace(/[^A-Z]/g, ""); // letters only
}

/**
 * Thrown when a name reduces to zero usable letters after normalization.
 * Form validation should prevent this, but calculations defend anyway rather
 * than silently returning a wrong number (numerology-reference.md §1.4).
 */
export class EmptyNameError extends Error {
  constructor(field: string) {
    super(`Name field "${field}" contains no A–Z letters after normalization.`);
    this.name = "EmptyNameError";
  }
}
