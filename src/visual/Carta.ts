import type { Carta } from '../model/carta';

export default class CartaElement extends HTMLElement {
  private _carta!: Carta;
  private _selecionada = false;
  
  constructor() {
    super();
  }

  set carta(carta: Carta) {
    this._carta = carta;
    this.render();
  }

  get selecionada() {
    return this._selecionada;
  }

  set selecionada(value: boolean) {
    this._selecionada = value;
    this.render();
  }

  limparSelecao() {
    this.selecionada = false
  }

  private render() {
    if (!this._carta) return;
    this.innerHTML = ``;

    const e = document.createElement('div');
    e.classList.add("card");

    if (this._carta.naipe === "♥" || this._carta.naipe === "♦") {
      e.classList.add("card-red");
    }

    if (this._selecionada) {
      e.classList.add("card-selected");
    }

    e.innerHTML = `${this._carta.valor}${this._carta.naipe}`


    this.appendChild(e);
  }
}

customElements.define('carta-element', CartaElement);