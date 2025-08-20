import type { Carta } from './carta';
import { Baralho } from './baralho';

export class Mao {
  private cartas: Carta[] = [];
  private selecionadas: number[] = [];
  static LIMITE = 8;

  get mao(): Carta[] { 
    return [...this.cartas]; 
  }

  get maoSelecionadas(): Carta[] {
    return this.selecionadas.map(i => this.cartas[i]);
  }

  public preencher(baralho: Baralho): void {
    const faltam = Mao.LIMITE - this.cartas.length;
    for (let i = 0; i < faltam; i++) {
      this.cartas.push(baralho.sacar());
    }
  }

  public sacar(baralho: Baralho): void {
    if (this.cartas.length < Mao.LIMITE) {
      this.cartas.push(baralho.sacar());
    }
  }

  private selecionarIndice(index: number): void {
    if (index >= 0 && index < this.cartas.length && !this.selecionadas.includes(index) && this.selecionadas.length < 5) {
      this.selecionadas.push(index);
    }
  }

  private deselecionarIndice(index: number): void {
    this.selecionadas = this.selecionadas.filter(i => i !== index);
  }

  public estaSelecionada(index: number): boolean {
    return this.selecionadas.includes(index);
  }

  public alternarSelecao(index: number): void {
    if (this.selecionadas.includes(index)) {
      this.deselecionarIndice(index);
    } else {
      this.selecionarIndice(index);
    }
  }

  public limparSelecao(): void {
    this.selecionadas = [];
  }
  
  public descartar(): Carta[] {
    const selecionadas = this.maoSelecionadas;
    this.cartas = this.cartas.filter((_, i) => !this.selecionadas.includes(i));
    this.limparSelecao();
    return selecionadas; 
  }

  public jogar(): Carta[] {
    const selecionadas = this.maoSelecionadas;
    this.cartas = this.cartas.filter((_, i) => !this.selecionadas.includes(i));
    this.limparSelecao();
    return selecionadas; 
  }
}