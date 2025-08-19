import type { Carta, Raridade } from '../model/carta';

const valorMap: Record<string, number> = { '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':15 };

export function avaliarMao(cartas: Carta[]): Raridade {
  const contV: Record<string, number> = {};
  const contN: Record<string, number> = {};
  for (const c of cartas) {
    contV[c.valor] = (contV[c.valor] || 0) + 1;
    contN[c.naipe] = (contN[c.naipe] || 0) + 1;
  }
  const valores = Object.values(contV);
  const flush = Object.values(contN).some(n => n >= 5);
  const tem4 = valores.includes(4);
  const tem3 = valores.includes(3);
  const pares = valores.filter(v => v === 2).length;
  if (tem4) return 'four_kind';
  if (tem3 && pares >= 1) return 'full_house';
  if (flush) return 'flush';
  if (tem3) return 'three_kind';
  if (pares >= 2) return 'two_pair';
  if (pares === 1) return 'pair';
  return 'high_card';
}

export function multiplicador(r: Raridade): number {
  switch (r) {
    case 'pair': return 2; case 'two_pair': return 3; case 'three_kind': return 4;
    case 'full_house': return 5; case 'flush': return 6; case 'four_kind': return 8;
    default: return 1;
  }
}

export function pontuar(cartasJogadas: Carta[]): { raridade: Raridade; pontos: number } {
  const raridade = avaliarMao(cartasJogadas);
  const base = cartasJogadas.reduce((s, c) => s + valorMap[c.valor], 0);
  return { raridade, pontos: base * multiplicador(raridade) };
}