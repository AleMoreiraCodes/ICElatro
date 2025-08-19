export class Placar {
  rodada: number;
  alvo: number;
  pontuacao: number;
  jogadasRestantes: number;
  descartesRestantes: number;

  constructor(rodada = 1, alvo = 100) {
    this.rodada = rodada;
    this.alvo = alvo;
    this.pontuacao = 0;
    this.jogadasRestantes = 5;   
    this.descartesRestantes = 3; 
  }

  adicionarPontos(p: number) {
    this.pontuacao += p;
  }

  consumirJogada() {
    if (this.jogadasRestantes > 0) {
      this.jogadasRestantes--;
    } else {
      throw new Error('Não há mais jogadas restantes.');
    }
  }

  consumirDescarte() {
    if (this.descartesRestantes > 0) {
      this.descartesRestantes--;
    } else {
      throw new Error('Não há mais descartes restantes.');
    }
  }

  resetarNovaRodada(novoAlvo: number) {
    this.rodada++;
    this.alvo = novoAlvo;
    this.pontuacao = 0;
    this.jogadasRestantes = 5;
    this.descartesRestantes = 3;
  }
}