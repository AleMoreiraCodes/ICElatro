import './Carta';
import type { CartaElement } from './Carta';
import { Mao } from '../model/mao';

export class MaoElement extends HTMLElement {
  private _mao?: Mao;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  set mao(v: Mao) {
    this._mao = v;
    this.render();
  }

  get indicesSelecionados(): number[] {
    return Array.from(this.querySelectorAll('carta-element'))
      .map((el, i) => (el as any).selecionada ? i : -1)
      .filter(i => i !== -1);
  }

  limparSelecao() {
    this.querySelectorAll('carta-element').forEach(el => (el as CartaElement).limparSelecao());
    this.render();
  }

  private render() {
    if (!this._mao) return;
    
    this.innerHTML = `<div class="hand"></div>`;

    const hand = this.querySelector('.hand')!;
    this._mao.getCartas().forEach(c => {
      const cartaEl = document.createElement('carta-element') as CartaElement;
      cartaEl.carta = c;
      hand.appendChild(cartaEl);
    });
  }
}

customElements.define('mao-element', MaoElement);