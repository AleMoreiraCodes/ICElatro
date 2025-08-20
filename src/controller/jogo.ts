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

    this.mao.preencher(this.baralho);
  }

  jogar() {
    const cartas = this.mao.jogar();
    const pontos = this.mesa.jogar(cartas);

    this.placar.adicionarPontos(pontos);
    this.placar.consumirJogada();
  }

  descartar() {
    this.mao.descartar();
    this.placar.consumirDescarte();
  }

  sacar() {
    this.mao.sacar(this.baralho); 
  }
}