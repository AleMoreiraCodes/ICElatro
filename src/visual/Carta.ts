import type { Carta } from '../model/carta';

export class CartaElement extends HTMLElement {
  private _carta!: Carta;
  private _selecionada = false;
  
  constructor() {
    super();
  }

   connectedCallback() {
    this.addEventListener('click', () => this.alternarSelecao());
  }

  set carta(v: Carta) {
    this._carta = v;
    this.render();
  }

  get selecionada() {
    return this._selecionada;
  }

  alternarSelecao() {
    this._selecionada = !this._selecionada;
    this.render();
  }

  limparSelecao() {
    this._selecionada = false;
    this.render();
  }

  private render() {
    if (!this._carta) return;
    this.innerHTML = `
      <div class="card ${this._carta.naipe==='♥'||this._carta.naipe==='♦'?'card-red':''} ${this._selecionada?'card-selected':''}">
        ${this._carta.valor}${this._carta.naipe}
      </div>
    `;
  }
}

customElements.define('carta-element', CartaElement);