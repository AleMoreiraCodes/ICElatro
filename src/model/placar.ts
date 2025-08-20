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
    this.jogadasRestantes = 4;   
    this.descartesRestantes = 3; 
  }

  adicionarPontos(p: number) {
    this.pontuacao += p;
  }

  consumirJogada() {
    if (this.jogadasRestantes > 0) {
      this.jogadasRestantes--;
    }
  }

  consumirDescarte() {
    if (this.descartesRestantes > 0) {
      this.descartesRestantes--;
    }
  }

  resetarRodada() {
    this.rodada = 1;
    this.alvo = 100;
    this.pontuacao = 0;
    this.jogadasRestantes = 5;
    this.descartesRestantes = 3;
  }

  avancarRodada() {
    this.rodada++;
    this.alvo = this.pontuacao * 2;
    this.pontuacao = 0;
    this.jogadasRestantes = 5;
    this.descartesRestantes = 3;
  }
}