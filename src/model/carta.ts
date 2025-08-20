export type Naipe = '♠' | '♥' | '♦' | '♣';
export type Valor = '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'J'|'Q'|'K'|'A';
export type Combinacao = 'Quadra' | 'FullHouse' | 'Flush' | 'Trinca' | 'Dupla' | 'MaiorCarta';
export const combinacoes: Record<Combinacao, number> = {
  'Quadra': 6,
  'FullHouse': 5,
  'Flush': 4,
  'Trinca': 3,
  'Dupla': 2,
  'MaiorCarta': 1,
};

export class Carta {
  naipe: Naipe;
  valor: Valor;

  constructor(naipe: Naipe, valor: Valor) {
    this.naipe = naipe;
    this.valor = valor;
  }

  getPontos(): number {
    if (this.valor === 'A') return 15;
    if (['K', 'Q', 'J'].includes(this.valor)) return 10;
    return parseInt(this.valor); 
  }
}