export type Naipe = '♠' | '♥' | '♦' | '♣';

export type ValorCarta = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Carta {
  naipe: Naipe;
  valor: ValorCarta; 
}

