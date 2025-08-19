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

  jogar() {
    const cartas = this.mao.jogar();
    this.mesa.jogar(cartas);

    const pontos = cartas.length * 10; // TODO: trocar pela lógica real de pontuação
    this.placar.adicionarPontos(pontos);
    this.placar.consumirJogada();
  }

  descartar() {
    this.mao.descartar();
    this.placar.consumirDescarte();
  }

  sacar() {
    this.mao.addCartas(this.baralho.distribuir(1));
  }
}