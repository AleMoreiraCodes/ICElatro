import './main.css';
import './visual/Mao';
import './visual/Mesa';
import './visual/Placar';
import { JogoController } from './controller/jogo';
import type { MesaElement } from './visual/Mesa';
import type { BaralhoElement } from './visual/Baralho';
import type { MaoElement } from './visual/Mao';
import type { PlacarElement } from './visual/Placar';

const app = document.getElementById('app')!;

const titulo = document.createElement('div');
titulo.id = 'title';
titulo.textContent = 'ICELATRO';

app.appendChild(titulo);

const game = new JogoController();

const mesaElement = document.createElement('mesa-element') as MesaElement;
const baralhoElement = document.createElement('baralho-element') as BaralhoElement;
const maoElement = document.createElement('mao-element') as MaoElement;
const placarElement = document.createElement('placar-element') as PlacarElement;

mesaElement.mesa = game.mesa;
baralhoElement.baralho = game.baralho;
maoElement.mao = game.mao;
placarElement.placar = game.placar;

app.appendChild(mesaElement);
app.appendChild(baralhoElement);
app.appendChild(maoElement);
app.appendChild(placarElement);
