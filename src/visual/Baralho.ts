import type { Baralho } from "../model/baralho";

export default class BaralhoElement extends HTMLElement {
  private _baralho!: Baralho;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  set baralho(baralho: Baralho) {
    this._baralho = baralho;
    this.render();
  }

  get baralho() {
    return this._baralho;
  }

  private render() {
    if (!this._baralho) return; 

    this.innerHTML = `
      <div class="deck-container">
        <div class="deck"></div>
        <div class="deck-count">${this.baralho.getTamanho()}</div>
      </div>
    `;
  }
}

customElements.define("baralho-element", BaralhoElement);