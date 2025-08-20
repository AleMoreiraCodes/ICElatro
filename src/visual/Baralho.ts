import type { Baralho } from "../model/baralho";

export default class BaralhoElement extends HTMLElement {
  private _baralho!: Baralho;

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  set baralho(baralho: Baralho) {
    this._baralho = baralho;
    this.render();
  }

  get baralho() {
    return this._baralho;
  }

  private handleClick() {
    this.dispatchEvent(new CustomEvent('sacar', {}));
  }

  private render() {
    if (!this._baralho) return;

    this.innerHTML = `
      <div class="deck-container">
        <div class="deck"></div>
        <div class="deck-count">${this.baralho.tamanho}</div>
      </div>
    `;
  }
}

customElements.define("baralho-element", BaralhoElement);