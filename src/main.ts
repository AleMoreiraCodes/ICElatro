import './style.css' 
import { Deck } from './core/deck';
import { Mao } from './core/mao';
import type { Carta } from './types';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    teste
  </div>
`
 

 
function main(): void {
  const deck = new Deck();
  deck.embaralhar(); 
  const mao = new Mao();

  mao.preencherAteLimite(deck);

  console.log('🃏 Mão do jogador (máx. 8 cartas):');
  mao.getCartas().forEach((carta, i) => {
    console.log(`Carta ${i + 1}: ${carta.valor} ${carta.naipe}`);
  });

  console.log('🔢 Total de cartas na mão:', mao.getCartas().length);


}

main()