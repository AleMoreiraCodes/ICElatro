import type { Carta } from './carta';

export class Mesa {
  private cartas: Carta[] = [];

  public jogar(cartas: Carta[]): void {
    this.cartas = [...cartas]; 
  }

  public limpar(): void {
    this.cartas = [];
  }

  public getCartas(): Carta[] {
    return [...this.cartas];
  }
}
