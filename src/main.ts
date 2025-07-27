import './style.css' 
import { Deck } from './core/deck';
import type { Carta } from './types';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    teste
  </div>
`
 

 
function main(): void {
  const deck = new Deck();

  const cartas: Carta[] = deck.getCartas();

  console.log('🃏 Cartas iniciais (aleatórias):');
  cartas.forEach((carta, i) => {
    console.log(`Carta ${i + 1}: ${carta.valor} ${carta.naipe}`);
  });


  deck.embaralhar();

  console.log('\n🃏 Cartas embaralhadas:')
  cartas.forEach((carta, i) => {
    console.log(`Carta ${i + 1}: ${carta.valor} ${carta.naipe}`);
  });

  console.log('\n🃏 Distribuindo 8 cartas:', deck.distribuir());

  console.log('🃏 Cartas finais (aleatórias):');
  cartas.forEach((carta, i) => {
    console.log(`Carta ${i + 1}: ${carta.valor} ${carta.naipe}`);
  });

}

main()