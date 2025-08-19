import type { Carta } from '../model/carta';

export class MaoElement extends HTMLElement {
  private _cartas: Carta[] = [];
  private selecionadas = new Set<number>();

  static get observedAttributes() { return ['mode']; }
  get cartas(): Carta[] { return this._cartas; }
  set cartas(v: Carta[]) { this._cartas = v; this.render(); }

  connectedCallback() { this.attachShadow({ mode: 'open' }); this.render(); }

  private toggle(i: number) {
    if (this.selecionadas.has(i)) {
      this.selecionadas.delete(i);
    } else {
      if (this.selecionadas.size >= 5) return;
      this.selecionadas.add(i);
    }
    this.updateSelection();
    this.dispatchEvent(new CustomEvent('selecoes-alteradas', { detail: Array.from(this.selecionadas) }));
  }

  get indicesSelecionados(): number[] { return Array.from(this.selecionadas).sort((a,b)=>a-b); }
  clearSelecao() { this.selecionadas.clear(); this.updateSelection(); }

  private updateSelection() {
    const cards = this.shadowRoot?.querySelectorAll('.card');
    cards?.forEach((el, idx) => {
      if (this.selecionadas.has(idx)) el.classList.add('sel'); else el.classList.remove('sel');
    });
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host{ position:fixed; bottom:8px; left:50%; transform:translateX(-50%); }
        .hand{ display:flex; gap:8px; padding:8px 12px; background:#0b3d0b; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,.25); }
        .card{ width:64px; height:96px; border-radius:8px; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; border:2px solid #222; font-weight:700; user-select:none; }
        .card.red{ color:#c00; }
        .card.sel{ outline:3px solid #1976d2; transform:translateY(-6px); }
      </style>
      <div class="hand">
        ${this._cartas.map((c,i)=>`<div class="card ${c.naipe==='♥'||c.naipe==='♦'?'red':''}" data-i="${i}">${c.valor}${c.naipe}</div>`).join('')}
      </div>`;
    this.shadowRoot.querySelectorAll('.card').forEach(el=>{
      el.addEventListener('click', ()=> this.toggle(Number((el as HTMLElement).dataset.i)));
    });
  }
}
customElements.define('mao-element', MaoElement);