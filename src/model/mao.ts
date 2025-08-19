import type { Carta } from './carta';
import { Baralho } from './baralho';

export class Mao {
  private cartas: Carta[] = [];
  static LIMITE = 8;

  getCartas(): Carta[] { return [...this.cartas]; }

  addCarta(carta: Carta): void { if (this.cartas.length < Mao.LIMITE) this.cartas.push(carta); }
  addCartas(cartas: Carta[]): void { cartas.forEach(c => this.addCarta(c)); }

  preencher(baralho: Baralho): void {
    const faltam = Mao.LIMITE - this.cartas.length;
    if (faltam > 0) this.addCartas(baralho.distribuir(Math.min(faltam, baralho.tamanho)));
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