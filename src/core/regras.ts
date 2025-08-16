export class Regras {
	// Exemplo simples: cada carta vale 1 ponto, pode ser expandido depois
	calcularPontos(cartas: { valor: string, naipe: string }[]): number {
		return cartas.length;
	}
}
