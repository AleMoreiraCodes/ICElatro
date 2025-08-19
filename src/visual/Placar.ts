import type { Placar } from "../model/placar";

export class PlacarElement extends HTMLElement {
  private _placar!: Placar;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
    if (!this.shadowRoot) return;
    if (!this._placar) return; 

    this.shadowRoot.innerHTML = `
      <style>
        .stat {
          padding: 8px 12px;
          background: #222;
          color: #fff;
          font-family: sans-serif;
          border-radius: 8px;
          display: inline-block;
        }
        .stat b {
          color: #0f0;
        }
        .actions {
          margin-top: 6px;
        }
      </style>
      <div class="stat">
        <div>Rodada: <b>${this._placar.rodada}</b></div>
        <div>Meta: <b>${this._placar.alvo}</b></div>
        <div>Pontos: <b>${this._placar.pontuacao}</b></div>
        <div>Jogadas: <b>${this._placar.jogadasRestantes}</b></div>
        <div>Descartes: <b>${this._placar.descartesRestantes}</b></div>
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

customElements.define("placar-element", PlacarElement);
