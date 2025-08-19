import type { Placar } from "../model/placar";

export default class PlacarElement extends HTMLElement {
  private _placar!: Placar;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  set placar(placar: Placar) {
    this._placar = placar;
    this.render();
  }

  get placar() {
    return this._placar;
  }

  private render() {
    if (!this._placar) return; 

    this.innerHTML = `
      <div class="score">
        <div class="score-item">
          <div class="score-item-label">Rodada: </div>
          <div class="score-item-value">${this._placar.rodada}</div>
        </div>
        <div class="score-item">
          <div class="score-item-label">Meta: </div>
          <div class="score-item-value">${this._placar.alvo}</div>
        </div>
        <div class="score-item">
          <div class="score-item-label">Pontos: </div>
          <div class="score-item-value">${this._placar.pontuacao}</div>
        </div>
        <div class="score-item">
          <div class="score-item-label">Jogadas: </div>
          <div class="score-item-value">${this._placar.jogadasRestantes}</div>
        </div>
        <div class="score-item">
          <div class="score-item-label">Descartes: </div>
          <div class="score-item-value">${this._placar.descartesRestantes}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("placar-element", PlacarElement);
