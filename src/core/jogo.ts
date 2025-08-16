import type { Carta } from '../types';
import { Mao } from './mao';
import { Deck } from './deck';
import { Regras } from './regras';

export class Jogo {
  private deck: Deck;
  private mao: Mao;
  private pontos: number;
  private regras: Regras;

  constructor() {
    this.deck = new Deck();
    this.deck.embaralhar();
    this.mao = new Mao();
    this.regras = new Regras();
    this.pontos = 0;
    this.iniciarMao();
  }

  public iniciarMao() {
    this.mao.limpar();
    this.mao.preencherAteLimite(this.deck);
    this.recalcularPontos();
  }

  public descartar(indices: number[]) {
    // Remove as cartas pelos índices (do fim para o início para não bagunçar os índices)
    const cartas = this.mao.getCartas();
    indices.sort((a, b) => b - a).forEach(idx => cartas.splice(idx, 1));
    // Atualiza a mão
    (this.mao as any).cartas = cartas; // hack: acesso direto para atualizar
    this.mao.preencherAteLimite(this.deck);
    this.recalcularPontos();
  }

  public jogar(indices: number[]) {
    // Jogar cartas é similar a descartar, mas pode ter lógica extra futuramente
    this.descartar(indices);
  }

  public getMao(): Carta[] {
    return this.mao.getCartas();
  }

  public getPontos(): number {
    return this.pontos;
  }

  private recalcularPontos() {
    this.pontos = this.regras.calcularPontos(this.mao.getCartas());
  }
}
