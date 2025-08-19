import { Mao } from '../model/mao';
import type { Carta } from '../model/carta';
import type { Placar } from '../model/placar';
import { Baralho } from '../model/baralho';
import { pontuar } from './poker';

type UpdateListener = (estado: any) => void;

export class JogoController {
  private listeners: UpdateListener[] = [];

  baralho = new Baralho();
  mao = new Mao();
  placar: Placar = { rodada: 1, alvo: 100, pontuacao: 0, jogadasRestantes: 4, descartesRestantes: 3 };
  ultimasJogadas: Carta[] = [];

  constructor() {
    this.mao.preencherAteLimite(this.baralho);
    this.emitUpdate();
  }

  onUpdate(listener: UpdateListener) {
    this.listeners.push(listener);
  }

  private emitUpdate() {
    this.listeners.forEach(l => l(this.estado));
  }

  get estado() {
    return {
      deck: this.baralho,
      mao: this.mao,
      placar: { ...this.placar },
      ultimasJogadas: this.ultimasJogadas
    };
  }

  sacar(n = 1) {
    if (this.mao.getCartas().length + n > 8) throw new Error('A mão já tem 8 cartas.');
    const cartas = this.baralho.distribuir(n);
    cartas.forEach(c => this.mao.addCarta(c));
    this.emitUpdate();
    return cartas;
  }

  jogar(indices: number[]): { pontos: number; raridade: string } {
    if (indices.length === 0 || indices.length > 5) throw new Error('Selecione de 1 a 5 cartas.');
    if (this.placar.jogadasRestantes <= 0) throw new Error('Sem jogadas restantes.');

    const jogadas = this.mao.removerIndices(indices);
    const { pontos, raridade } = pontuar(jogadas);

    this.placar.pontuacao += pontos;
    this.placar.jogadasRestantes -= 1;
    this.ultimasJogadas = jogadas;

    this.emitUpdate();
    return { pontos, raridade };
  }

  descartar(indices: number[]) {
    if (indices.length === 0 || indices.length > 5) throw new Error('Selecione de 1 a 5 cartas.');
    if (this.placar.descartesRestantes <= 0) throw new Error('Sem descartes restantes.');

    this.mao.removerIndices(indices);
    this.placar.descartesRestantes -= 1;
    this.mao.preencherAteLimite(this.baralho);
    this.emitUpdate();
  }

  terminouRodada() {
    return this.placar.jogadasRestantes === 0;
  }

  venceuRodada() {
    return this.placar.pontuacao >= this.placar.alvo;
  }

  proximaRodada() {
    if (!this.venceuRodada()) throw new Error('Rodada não vencida.');

    this.placar.rodada += 1;
    this.placar.alvo *= 2;
    this.placar.pontuacao = 0;
    this.placar.jogadasRestantes = 4;
    this.placar.descartesRestantes = 3;

    this.baralho.resetar();
    this.mao = new Mao();
    this.mao.preencherAteLimite(this.baralho);
    this.ultimasJogadas = [];
    this.emitUpdate();
  }
}