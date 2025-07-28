import type { Carta } from '../types';
import { Deck } from './deck';

export class Mao {
  private cartas: Carta[] = [];
  private readonly LIMITE = 8;

  public getCartas(): Carta[] {
    return [...this.cartas];  
  }

  public limpar(): void {
    this.cartas = [];
  }

  public adicionarCarta(carta: Carta): void {
    if (this.cartas.length < this.LIMITE) {
      this.cartas.push(carta);
    } else { 
      console.warn('Limite de cartas atingido (8).');
    }
  }

  public preencherAteLimite(deck: Deck): void {
    const faltam = this.LIMITE - this.cartas.length;
    if (faltam > 0) {
      const novas = deck.distribuir(faltam);
      this.cartas.push(...novas);
    }
  }

  public estaCheia(): boolean {
    return this.cartas.length >= this.LIMITE;
  }
}
