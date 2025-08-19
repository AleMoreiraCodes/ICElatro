import { Baralho } from '../model/baralho';
import type { Carta } from '../model/carta';

export class BaralhoElement extends HTMLElement {
  deck = new Baralho();

  connectedCallback() {
    this.render();
  }

  private sacar() {
    if (this.deck.tamanho <= 0) {
      this.dispatchEvent(new CustomEvent('deck-vazio'));
      return;
    }
    const carta = this.deck.distribuir(1)[0];
    this.dispatchEvent(new CustomEvent<Carta>('sacou-carta', { detail: carta, bubbles: true, composed: true }));
  }

  private render() {
    this.innerHTML = `
      <style>
        .wrap { display:flex; flex-direction:column; align-items:center; gap:6px; cursor:pointer; }
        .deck { width:84px; height:120px; background:#145214; border:3px solid #0b3d0b; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:40px; color:#fff; }
        .label { font-size:12px; font-weight:700; color:#fff; }
      </style>
      <div class="wrap" part="wrap">
        <div class="deck" part="deck">🂠</div>
        <div class="label">Sacar</div>
      </div>
    `;
    this.querySelector('.wrap')?.addEventListener('click', () => this.sacar());
  }
}

customElements.define('baralho-element', BaralhoElement);