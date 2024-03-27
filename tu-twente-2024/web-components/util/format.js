// @ts-check
const units = Object.freeze({
  k: 1_000,
  M: 1_000_000,
  B: 1_000_000_000,
});

/**
 * Formats a (large) number to string
 * @example 1_000 => '1k', 1_000_000 => `1M`, 1_000_000_000 => `1B`
 * @param {number} n
 * @param {number} numberOfDigest
 * @returns {string}
 */
export function formatDownloads(n, numberOfDigest = 1) {
  const entry = Object.entries(units)
    .sort((a, b) => b[1] - a[1])
    .find(([, val]) => n > val);
  if (entry) {
    const [unit, amount] = entry;
    const roundingFactor = 10 ** numberOfDigest;
    return `${(
      Math.round((n / amount) * roundingFactor) / roundingFactor
    ).toFixed(numberOfDigest)}${unit}`;
  }
  return n.toString();
}
