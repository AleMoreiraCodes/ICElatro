
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
        <div class="mao-botoes">
          <button class="btn-jogar" type="button">Jogar</button>
          <button class="btn-descartar" type="button">Descartar</button>
        </div>
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
    // Listeners dos botões (eventos reais devem ser conectados na integração)
    this.querySelector('.btn-jogar')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('jogar', { detail: this.selecionadas }));
    });
    this.querySelector('.btn-descartar')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('descartar', { detail: this.selecionadas }));
    });
  }
}

customElements.define('mao-do-jogador', MaoDoJogador);
