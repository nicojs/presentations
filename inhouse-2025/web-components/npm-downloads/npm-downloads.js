// @ts-check

import { DownloadCache } from '../util/cache.js';
import { formatDownloads } from '../util/format.js';

class NpmDownloads extends HTMLElement {
  #cache = new DownloadCache('npmDownloads');

  get package() {
    return this.getAttribute('package');
  }
  set package(value) {
    if (value) {
      this.setAttribute('package', value);
    } else {
      this.removeAttribute('package');
    }
  }

  get period() {
    return (
      this.getAttribute('period') ??
      `2000-01-01:${new Date().toISOString().split('T')[0]}`
    );
  }
  set period(value) {
    if (value) {
      this.setAttribute('period', value);
    } else {
      this.removeAttribute('period');
    }
  }

  /**
   * @returns {Promise<number>}
   */
  async #getFromNpm() {
    const resp = await fetch(
      `https://api.npmjs.org/downloads/point/${this.period}/${this.package}`
    );
    const { downloads } = await resp.json();
    return downloads;
  }

  connectedCallback() {
    this.#update().catch((err) => {
      console.error(err);
      this.innerHTML = 'ERROR could not retrieve downloads';
    });
  }

  async #update() {
    if (!this.package) {
      this.innerHTML = 'ERROR, missing "package" attribute';
    } else {
      // by default, every time this component is used, it will fetch data from npm.
      // if a slide deck uses this component 20 times, that's 20 fetches to npm.
      // to relieve npm a bit, let's apply some caching
      let downloads = this.#cache.get(this.package, this.period);
      if (typeof downloads === 'undefined') {
        downloads = await this.#getFromNpm();
        this.#cache.set(this.package, downloads, this.period);
      }
      this.innerHTML = formatDownloads(downloads);
    }
  }
}

customElements.define('npm-downloads', NpmDownloads);
