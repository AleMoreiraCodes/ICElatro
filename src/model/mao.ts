import type { Carta } from './carta';
import { Baralho } from './baralho';

export class Mao {
  private cartas: Carta[] = [];
  private selecionadas: number[] = [];
  static LIMITE = 8;

  getCartas(): Carta[] { 
    return [...this.cartas]; 
  }

  preencher(baralho: Baralho): void {
    const faltam = Mao.LIMITE - this.cartas.length;
    for (let i = 0; i < faltam; i++) {
      this.cartas.push(baralho.sacar());
    }
  }

  sacar(baralho: Baralho): void {
    if (this.cartas.length < Mao.LIMITE) {
      this.cartas.push(baralho.sacar());
    }
  }

  selecionarIndice(index: number): void {
    if (index >= 0 && index < this.cartas.length && !this.selecionadas.includes(index) && this.selecionadas.length < 5) {
      this.selecionadas.push(index);
    }
  }

  deselecionarIndice(index: number): void {
    this.selecionadas = this.selecionadas.filter(i => i !== index);
  }

  estaSelecionada(index: number): boolean {
    return this.selecionadas.includes(index);
  }

  alternarSelecao(index: number): void {
    if (this.selecionadas.includes(index)) {
      this.deselecionarIndice(index);
    } else {
      this.selecionarIndice(index);
    }
  }

  limparSelecao(): void {
    this.selecionadas = [];
  }

  getSelecionadas(): Carta[] {
    return this.selecionadas.map(i => this.cartas[i]);
  }

  getIndicesSelecionados(): number[] {
    return [...this.selecionadas];
  }
  
  descartar(): Carta[] {
    const selecionadas = this.getSelecionadas();
    this.cartas = this.cartas.filter((_, i) => !this.selecionadas.includes(i));
    this.limparSelecao();
    return selecionadas; 
  }

  jogar(): Carta[] {
    const selecionadas = this.getSelecionadas();
    this.cartas = this.cartas.filter((_, i) => !this.selecionadas.includes(i));
    this.limparSelecao();
    return selecionadas; 
  }
}