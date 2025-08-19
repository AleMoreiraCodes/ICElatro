export type Naipe = '♠' | '♥' | '♦' | '♣';
export type Valor = '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'J'|'Q'|'K'|'A';
export type Raridade = 'high_card'|'pair'|'two_pair'|'three_kind'|'full_house'|'flush'|'four_kind';

export interface Carta { naipe: Naipe; valor: Valor; }