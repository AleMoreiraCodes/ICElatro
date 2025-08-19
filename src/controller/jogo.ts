import { Baralho } from '../model/baralho';
import { Mao } from '../model/mao';
import { Mesa } from '../model/mesa';
import { Placar } from '../model/placar';

export class JogoController {
  baralho: Baralho;
  mao: Mao;
  mesa: Mesa;
  placar: Placar;

  constructor() {
    this.baralho = new Baralho();
    this.mao = new Mao();
    this.mesa = new Mesa();
    this.placar = new Placar(1, 100);

    this.mao.addCartas(this.baralho.distribuir(Mao.LIMITE));
  }

  jogar(indices: number[]) {
    const cartas = this.mao.removerIndices(indices);
    this.mesa.jogar(cartas);

    const pontos = cartas.length * 10; // TODO: trocar pela lógica real de pontuação
    this.placar.adicionarPontos(pontos);
    this.placar.consumirJogada();

    return { pontos, raridade: 'JOGADA' };
  }

  descartar(indices: number[]) {
    this.mao.removerIndices(indices);
    this.placar.consumirDescarte();
  }

  sacar() {
    this.mao.addCartas(this.baralho.distribuir(1));
  }

  proximaRodada() {
    this.mesa.limpar();
    this.placar.resetarNovaRodada(this.placar.alvo + 50);
    this.mao = new Mao();
    this.mao.addCartas(this.baralho.distribuir(Mao.LIMITE));
  }

  terminouRodada(): boolean {
    return this.placar.jogadasRestantes <= 0 &&
           this.placar.descartesRestantes <= 0;
  }

  venceuRodada(): boolean {
    return this.placar.pontuacao >= this.placar.alvo;
  }
}