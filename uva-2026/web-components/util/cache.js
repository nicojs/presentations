// @ts-check

const DEFAULT_PERIOD = 'total';

export class DownloadCache {
  /** @type {string} */
  #cacheKey;

  /** @param {string} cacheKey */
  constructor(cacheKey) {
    this.#cacheKey = cacheKey;
  }

  /**
   * @param {string} pkg
   * @param {string} period
   * @returns {number|undefined}
   */
  get(pkg, period = DEFAULT_PERIOD) {
    const cacheJson = sessionStorage.getItem(this.#cacheKey);
    if (cacheJson) {
      /** @type {Record<string, number>} */
      const cache = JSON.parse(cacheJson);
      const downloadsKey = this.#generateKey(pkg, period);
      const val = cache[downloadsKey];
      if (val) {
        return val;
      }
    }
  }

  /**
   * @param {string} pkg
   * @param {string} period
   * @returns {string}
   */
  #generateKey(pkg, period) {
    return `${pkg}/${period}`;
  }

  /**
   * Set a package downloads for a certain period
   * @param {string} pkg
   * @param {number} val
   * @param {string} period
   */
  set(pkg, val, period = DEFAULT_PERIOD) {
    const cacheJson = sessionStorage.getItem(this.#cacheKey);
    /** @type {Record<string, number>} */
    const cache = cacheJson ? JSON.parse(cacheJson) : Object.create(null);
    cache[this.#generateKey(pkg, period)] = val;
    sessionStorage.setItem(this.#cacheKey, JSON.stringify(cache));
  }
}
