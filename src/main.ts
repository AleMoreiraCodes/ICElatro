import './style.css';
import './icelatro-header.css';
import { Deck } from './core/deck';
import { Mao } from './core/mao';
import { MaoDoJogador } from './components/MaoDoJogador';

// Adiciona arte do título no topo
const header = document.createElement('div');
header.className = 'icelatro-header';
header.innerHTML = `
  <span class="icelatro-title">ICElatro</span>
`;
document.body.prepend(header);

function main(): void {
  const deck = new Deck();
  deck.embaralhar();
  const mao = new Mao();
  mao.preencherAteLimite(deck);

  // Cria o elemento customizado
  const maoEl = document.createElement('mao-do-jogador');
  // @ts-ignore: Propriedade customizada
  maoEl.cartas = mao.getCartas();

  // Remove qualquer mao-do-jogador anterior
  document.querySelectorAll('mao-do-jogador').forEach(el => el.remove());
  // Adiciona ao final do body para garantir que fique fixo na parte inferior
  document.body.appendChild(maoEl);
}

main();