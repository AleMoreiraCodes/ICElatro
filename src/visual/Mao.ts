import './Carta';
import type CartaElement from './Carta';
import { Mao } from '../model/mao';

export default class MaoElement extends HTMLElement {
  private _mao?: Mao;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  set mao(mao: Mao) {
    this._mao = mao;
    this.render();
  }

  get indicesSelecionados(): number[] {
    return this._mao ? [...this._mao['selecionadas']] : [];
  }

  limparSelecao() {
    this._mao?.limparSelecao();
    this.render();
  }

  private render() {
    if (!this._mao) return;

    this.innerHTML = `<div class="hand"></div>`;
    const hand = this.querySelector('.hand')!;

    this._mao.mao.forEach((carta, index) => {
      const cartaElement = document.createElement('carta-element') as CartaElement;
      cartaElement.carta = carta;

      if (this._mao?.estaSelecionada(index)) {
        cartaElement.selecionada = true;
      }

      cartaElement.addEventListener('click', () => {
        this._mao?.alternarSelecao(index);
        this.render();
      });

      hand.appendChild(cartaElement);
    });
  }
}

customElements.define('mao-element', MaoElement);