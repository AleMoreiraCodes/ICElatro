import type { Carta } from '../model/carta';
import type { Placar } from '../model/placar';

export class MesaElement extends HTMLElement {
  private _ultimas: Carta[] = [];
  
  set ultimasJogadas(v: Carta[]){ this._ultimas = v; this.render(); }
  
  connectedCallback(){ this.attachShadow({mode:'open'}); this.render(); }

  private render(){
    if(!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        .board{ display:grid; grid-template-columns: 240px 1fr 240px; align-items:center; gap:24px; margin:64px auto; max-width:980px; }
        .center{ display:flex; gap:10px; justify-content:center; align-items:center; min-height:140px; }
        .stat{ background:#0b3d0b; color:#fff; padding:12px 16px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,.25); }
        .card{ width:64px; height:96px; border-radius:8px; background:#fff; display:flex; align-items:center; justify-content:center; border:2px solid #222; font-weight:700; user-select:none; }
        .card.red{ color:#c00; }
        .actions{ display:flex; gap:8px; justify-content:center; margin-top:8px; }
        button{ padding:8px 12px; border-radius:8px; border:0; cursor:pointer; font-weight:700; }
      </style>
      <div class="board">
        <slot name="left"></slot>
        <div class="center">
          ${this._ultimas.map(c=>`<div class="card ${c.naipe==='♥'||c.naipe==='♦'?'red':''}">${c.valor}${c.naipe}</div>`).join('') || '<div class="stat">Jogue até 5 cartas</div>'}
        </div>
      </div>`;
  }
}
customElements.define('mesa-element', MesaElement);