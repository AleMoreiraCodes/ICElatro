import type { Carta } from './carta';

export class Mesa {
  private cartas: Carta[] = [];

  jogar(cartas: Carta[]): void {
    this.cartas = [...cartas]; 
  }

  limpar(): void {
    this.cartas = [];
  }

  getCartas(): Carta[] {
    return [...this.cartas];
  }
}
