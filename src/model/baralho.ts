import type { Naipe, Carta, Valor } from './carta';

export class Baralho {
  private cartas: Carta[] = [];

  constructor() {
    this.inicializar();
    this.embaralhar();
  }

  private inicializar(): void {
    const naipes: Naipe[] = ['♠', '♥', '♦', '♣'];
    const valores: Valor[] = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    this.cartas = [];
    for (const naipe of naipes) {
      for (const valor of valores) this.cartas.push({ naipe, valor });
    }
  }

  public embaralhar(): void {
    for (let i = this.cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
    }
  }

  public distribuir(n: number): Carta[] { return this.cartas.splice(0, n); }
  
  public resetar(): void { this.inicializar(); this.embaralhar(); }
  
  public get tamanho(): number { return this.cartas.length; }
}