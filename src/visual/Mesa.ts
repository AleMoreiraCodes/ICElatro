import './Carta';
import { Mesa } from '../model/mesa';
import CartaElement  from './Carta';

export default class MesaElement extends HTMLElement {
  private _mesa!: Mesa;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  set mesa(mesa: Mesa) {
    this._mesa = mesa;
    this.render();
  }

  get mesa(): Mesa {
    return this._mesa;
  }

  private render() {
    if (!this._mesa) return;

    this.innerHTML = ``;

    const tableContainer = document.createElement('div');
    tableContainer.classList.add("table-container");

    const table = document.createElement('div');
    table.classList.add("table");

    tableContainer.appendChild(table);

    const cartas = this._mesa.getCartas();

    cartas.forEach(carta => {
      const cartaElement = document.createElement('carta-element') as CartaElement;
      cartaElement.carta = carta;
      table.appendChild(cartaElement);
    });

    const combinacao = document.createElement('div');
    combinacao.innerHTML = `${this._mesa.getCombinacao() ? `<div class="combinacao">${this._mesa.getCombinacao()}</div>` : ''}`;
    tableContainer.appendChild(combinacao);

    this.appendChild(tableContainer);

  }
}

customElements.define('mesa-element', MesaElement);