// @ts-check

import { DownloadCache } from '../util/cache.js';
import { formatDownloads } from '../util/format.js';

class NugetSearchQueryServiceResolver {
  #url;

  async searchUrl() {
    if (!this.#url) {
      const resp = await fetch('https://api.nuget.org/v3/index.json');
      const { resources } = await resp.json();
      this.#url = resources.find(
        (res) => res['@type'] === 'SearchQueryService'
      )['@id'];
    }
    return this.#url;
  }
}
const nugetResolver = new NugetSearchQueryServiceResolver();

export class NugetDownloadsElement extends HTMLElement {
  #cache = new DownloadCache('npmDownloads');

  get package() {
    return this.getAttribute('package');
  }
  connectedCallback() {
    this.#update().catch((err) => {
      this.innerHTML = 'ERROR, could not retrieve downloads';
      console.error(err);
    });
  }

  async #update() {
    if (this.package) {
      let downloads = this.#cache.get(this.package);
      if (typeof downloads === 'number') {
        this.innerHTML = formatDownloads(downloads);
      } else {
        const searchBaseUrl = await nugetResolver.searchUrl();
        const resp = await fetch(
          `${searchBaseUrl}?q=packageid:${this.package}`
        );
        const {
          data: {
            0: { totalDownloads },
          },
        } = await resp.json();
        this.innerHTML = formatDownloads(totalDownloads);
      }
    } else {
      this.innerHTML = 'ERROR, missing "package" attribute';
    }
  }
}

customElements.define('nuget-downloads', NugetDownloadsElement);
