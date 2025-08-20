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

  public adicionarPontos(p: number): void {
    this.pontuacao += p;
  }

  public consumirJogada(): void {
    if (this.jogadasRestantes > 0) {
      this.jogadasRestantes--;
    }
  }

  public consumirDescarte(): void {
    if (this.descartesRestantes > 0) {
      this.descartesRestantes--;
    }
  }

  public resetarRodada(): void  {
    this.rodada = 1;
    this.alvo = 100;
    this.pontuacao = 0;
    this.jogadasRestantes = 5;
    this.descartesRestantes = 3;
  }

  public avancarRodada(): void {
    this.rodada++;
    this.alvo = this.alvo * 2;
    this.pontuacao = 0;
    this.jogadasRestantes = 5;
    this.descartesRestantes = 3;
  }
}