
import './MaoDoJogador.css';
import type { Carta } from '../types';

export class MaoDoJogador extends HTMLElement {
  private _cartas: Carta[] = [];

  set cartas(cartas: Carta[]) {
    this._cartas = cartas;
    this.render();
  }

  get cartas() {
    return this._cartas;
  }

  connectedCallback() {
    this.render();
  }

  private selecionadas: number[] = [];

  render() {
    this.innerHTML = `
      <div class="mao-do-jogador">
        ${this._cartas.map((carta, idx) => `
          <div class="carta${this.selecionadas.includes(idx) ? ' selecionada' : ''}" data-idx="${idx}">
            <span class="valor">${carta.valor}</span>
            <span class="naipe">${carta.naipe}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Adiciona listeners de clique para seleção
    this.querySelectorAll<HTMLElement>('.carta').forEach((el) => {
      el.onclick = () => {
        const idx = Number(el.dataset.idx);
        if (this.selecionadas.includes(idx)) {
          this.selecionadas = this.selecionadas.filter(i => i !== idx);
        } else if (this.selecionadas.length < 5) {
          this.selecionadas = [...this.selecionadas, idx];
        }
        this.render();
      };
    });
  }
}

customElements.define('mao-do-jogador', MaoDoJogador);
