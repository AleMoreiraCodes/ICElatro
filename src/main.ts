import './main.css';
import './visual/Mao';
import './visual/Mesa';
import './visual/Placar';
import { JogoController } from './controller/jogo';
import MesaElement from './visual/Mesa';
import BaralhoElement from './visual/Baralho';
import MaoElement from './visual/Mao';
import PlacarElement from './visual/Placar';

const app = document.getElementById('app')!;

const titulo = document.createElement('div');
titulo.id = 'title';
titulo.textContent = 'ICELATRO';

app.appendChild(titulo);

const jogo = new JogoController();

const mesaElement = document.createElement('mesa-element') as MesaElement;
const baralhoElement = document.createElement('deck-element') as BaralhoElement;
const maoElement = document.createElement('mao-element') as MaoElement;
const placarElement = document.createElement('placar-element') as PlacarElement;

atualizarVisual();

app.appendChild(mesaElement);
app.appendChild(baralhoElement);
app.appendChild(maoElement);
app.appendChild(placarElement);

const controles = document.createElement('div');
controles.classList.add('controles');

const btnJogar = document.createElement('button');
btnJogar.textContent = 'Jogar';
btnJogar.classList.add("jogar");
btnJogar.addEventListener('click', () => {
    jogo.jogar();
    atualizarVisual();
});

const btnDescartar = document.createElement('button');
btnDescartar.textContent = 'Descartar';
btnDescartar.classList.add("descartar");
btnDescartar.addEventListener('click', () => {
    jogo.descartar();
    atualizarVisual();
});

controles.appendChild(btnJogar);
controles.appendChild(btnDescartar);

app.appendChild(controles);

function atualizarVisual() {
    mesaElement.mesa = jogo.mesa;
    baralhoElement.baralho = jogo.baralho;
    maoElement.mao = jogo.mao;
    placarElement.placar = jogo.placar; 
}