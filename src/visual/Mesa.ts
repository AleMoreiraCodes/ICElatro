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

    this.innerHTML = `<div class="table"></div>`;

    const center = this.querySelector('.table')!;
    const cartas = this._mesa.getCartas();

    cartas.forEach(carta => {
      const CartaElement = document.createElement('carta-element') as CartaElement;
      CartaElement.carta = carta;
      center.appendChild(CartaElement);
    });
  }
}

customElements.define('mesa-element', MesaElement);