import { combinacoes, type Carta, type Combinacao } from './carta';

export class Mesa {
  private cartas: Carta[] = [];
  private combinacao?: Combinacao;

  public jogar(cartas: Carta[]): number {
    this.cartas = [...cartas];

    let pontos = 0.00;
    this.cartas.forEach(carta => {
      pontos += carta.pontos;
    });

    this.combinacao = this.calcularCombinacao(cartas);

    pontos *= combinacoes[this.combinacao!];

    return pontos;
  }

  get mesa(): Carta[] {
    return [...this.cartas];
  }

  get combinacaoAtual(): Combinacao | undefined {
    return this.combinacao;
  }

  private calcularCombinacao(cartas: Carta[]): Combinacao {
    const naipes = cartas.map(c => c.naipe);
    const valores = cartas.map(c => c.valor);

    const contagemValores = new Map<string, number>();
    valores.forEach(v => contagemValores.set(v, (contagemValores.get(v) || 0) + 1));

    const contagem = Array.from(contagemValores.values()).sort((a, b) => b - a); 

    if (contagem[0] === 4) {
        return 'Quadra';
    }

    if (contagem[0] === 3 && contagem[1] === 2) {
        return 'FullHouse';
    }

    if (naipes.length == 5) {
      const todosMesmoNaipe = naipes.every(n => n === naipes[0]);
      if (todosMesmoNaipe) {
        return 'Flush';
      }
    }

    if (contagem[0] === 3) {
        return 'Trinca';
    }

    if (contagem[0] === 2) {
        return 'Dupla';
    }

    return 'MaiorCarta';
  }
}
