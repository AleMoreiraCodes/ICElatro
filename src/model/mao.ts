import type { Carta } from './carta';
import { Baralho } from './baralho';

export class Mao {
  private cartas: Carta[] = [];
  static LIMITE = 8;

  getCartas(): Carta[] { return [...this.cartas]; }
  addCarta(c: Carta): void { if (this.cartas.length < Mao.LIMITE) this.cartas.push(c); }
  addCartas(cs: Carta[]): void { cs.forEach(c => this.addCarta(c)); }

  preencherAteLimite(deck: Baralho): void {
    const faltam = Mao.LIMITE - this.cartas.length;
    if (faltam > 0) this.addCartas(deck.distribuir(Math.min(faltam, deck.tamanho)));
  }

  removerIndices(indices: number[]): Carta[] {
    const set = new Set(indices);
    const removidas: Carta[] = [];
    const mantidas: Carta[] = [];
    this.cartas.forEach((c, i) => (set.has(i) ? removidas.push(c) : mantidas.push(c)));
    this.cartas = mantidas;
    return removidas;
  }
}