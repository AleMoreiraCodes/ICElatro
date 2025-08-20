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
    this.validarEstado();
  }

  descartar() {
    this.mao.descartar();
    this.placar.consumirDescarte();
  }

  sacar() {
    this.mao.sacar(this.baralho); 
  }

  private validarEstado(): void {
    if (this.placar.pontuacao >= this.placar.alvo) {
      alert('Parabéns! Você atingiu a pontuação necessária!');
      this.avancar();
      return;
    } 
    
    if (this.placar.jogadasRestantes <= 0) {
      alert('Fim de jogo! Você não conseguiu atingir a pontuação.');
      this.reiniciar();
      return;
    }
  }

  private avancar(): void {
    this.baralho = new Baralho();
    this.mao = new Mao();
    this.mesa = new Mesa();
    this.placar.avancarRodada();

    this.mao.preencher(this.baralho);
  }

  private reiniciar(): void {
    this.baralho = new Baralho();
    this.mao = new Mao();
    this.mesa = new Mesa();
    this.placar.resetarRodada();

    this.mao.preencher(this.baralho);
  }
}