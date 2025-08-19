import './main.css';
import './visual/Mao';
import './visual/Mesa';
import './visual/Placar';
import { JogoController } from './controller/jogo';

const app = document.getElementById('app')!;

// Inicializa o controlador do jogo
const game = new JogoController();

// Cria os elementos da interface
const mesaElement = document.createElement('mesa-element') as any;
const baralhoElement = document.createElement('baralho-element');
const maoElement = document.createElement('mao-element') as any;
const placarElement = document.createElement('placar-element') as any;

// Define os estados iniciais
maoElement.cartas = game.estado.mao.getCartas();
placarElement.placar = game.estado.placar;

// Cria os botões de ação
const btnJogar = document.createElement('button');
btnJogar.textContent = 'Jogar Selecionadas';

btnJogar.addEventListener('click', () => {
  const idx: number[] = maoElement.indicesSelecionados?.slice(0, 5) || [];
  if (!idx.length) return alert('Selecione até 5 cartas para jogar.');
  try {
    const { pontos, raridade } = game.jogar(idx);
    mesaElement.ultimasJogadas = idx.map((i: number) => game.estado.mao.getCartas()[i]);
    maoElement.cartas = game.estado.mao.getCartas();
    maoElement.clearSelecao();
    placarElement.placar = game.estado.placar;
    alert(`Você fez ${raridade.replace('_', ' ')} e ganhou ${pontos} pontos!`);
    if (game.terminouRodada()) fimDeRodada();
  } catch (e: any) {
    alert(e.message);
  }
});

const btnDescartar = document.createElement('button');
btnDescartar.textContent = 'Descartar Selecionadas';

btnDescartar.addEventListener('click', () => {
  const idx: number[] = maoElement.indicesSelecionados?.slice(0, 5) || [];
  if (!idx.length) return alert('Selecione até 5 cartas para descartar.');
  try {
    game.descartar(idx);
    maoElement.cartas = game.estado.mao.getCartas();
    maoElement.clearSelecao();
    placarElement.placar = game.estado.placar;
    if (game.terminouRodada()) fimDeRodada();
  } catch (e: any) {
    alert(e.message);
  }
});

// Configura slots e actions no mesaElement
mesaElement.appendChild(Object.assign(document.createElement('div'), { slot: 'left' })).appendChild(baralhoElement);
const actions = Object.assign(document.createElement('div'), { slot: 'actions' });
actions.append(btnJogar, btnDescartar);
mesaElement.appendChild(actions);

// Adiciona elementos ao DOM
app.appendChild(mesaElement);
app.appendChild(maoElement);
app.appendChild(placarElement);

// Evento de sacar carta pelo baralho
(baralhoElement as any).addEventListener('sacou-carta', () => {
  if (game.estado.mao.getCartas().length >= 8) return alert('A mão já tem 8 cartas.');
  game.sacar(1);
  maoElement.cartas = game.estado.mao.getCartas();
});

// Funções auxiliares
function fimDeRodada() {
  if (game.venceuRodada()) {
    const ok = confirm(
      `Parabéns! Você atingiu ${game.estado.placar.pontuacao} pontos (meta ${game.estado.placar.alvo}). Ir para a próxima rodada?`
    );
    if (ok) {
      game.proximaRodada();
      atualizarUI();
    }
  } else {
    alert(`Derrota! Você somou ${game.estado.placar.pontuacao}/${game.estado.placar.alvo}.`);
    location.reload();
  }
}

function atualizarUI() {
  maoElement.cartas = game.estado.mao.getCartas();
  mesaElement.ultimasJogadas = [];
  placarElement.placar = game.estado.placar;
}
