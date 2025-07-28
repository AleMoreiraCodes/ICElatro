import type { Naipe, Carta, ValorCarta } from '../types';



export class Deck {
  private cartas: Carta[] = [];

  constructor() {
    this.inicializarDeck();
  }

  private inicializarDeck(): void {
    const naipes: Naipe[] = ['♠', '♥', '♦', '♣'];
    const valores: ValorCarta[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    for (const naipe of naipes) {
      for (const valor of valores) {
        this.cartas.push({ naipe, valor});
      }
    }
 
  }

  public getCartas(): Carta[] {
    return this.cartas;
  }

    public getCartaAleatoria(): Carta {
        const indiceAleatorio = Math.floor(Math.random() * this.cartas.length);
        return this.cartas[indiceAleatorio];
    }

    public embaralhar(): void {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }
    public distribuir(numCartas: number): Carta[] {
        return this.cartas.splice(0, numCartas);
    }
}