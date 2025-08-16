import './style.css';
import { Deck } from './core/deck';
import { Mao } from './core/mao';
import './components/MaoDoJogador';

function main(): void {
  const deck = new Deck();
  deck.embaralhar();
  const mao = new Mao();
  mao.preencherAteLimite(deck);

  // Cria o elemento customizado
  const maoEl = document.createElement('mao-do-jogador');
  // @ts-ignore: Propriedade customizada
  maoEl.cartas = mao.getCartas();

  const app = document.querySelector<HTMLDivElement>('#app');
  if (app) {
    app.innerHTML = '';
    app.appendChild(maoEl);
  }
}

main();