import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-memory',
  imports: [RouterLink],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css'
})
export class MemoryComponent {
  cards: any[] = [];
  flipped: number[] = [];
  gameWon: boolean = false;
  flips: number = 0;
  squares = Array.from({ length: 16 }, (_, i) => ({
    value: Math.floor(i / 2), // 8 pairs
    revealed: false,
    matched: false,
    id: i,
  })).sort(() => Math.random() - 0.5); // Shuffle

  flippedCards: any[] = [];
  
  onSquareClick(square: any) {
    if (square.revealed || square.matched || this.flippedCards.length === 2) return;

    square.revealed = true;
    this.flippedCards.push(square);

    if (this.flippedCards.length === 2) {
      setTimeout(() => {
        const [a, b] = this.flippedCards;
        if (a.value === b.value) {
          a.matched = b.matched = true;
        } else {
          a.revealed = b.revealed = false;
        }
        this.flippedCards = [];
        if (this.squares.every(s => s.matched)) {
          this.gameWon = true;
          setTimeout(() => this.resetGame(), 3000); // Reset after 3 sec
        }
      }, 1000); // 1 second delay before hiding
    }
  }
  resetGame() {
    const values = Array.from({ length: 8 }, (_, i) => i).flatMap(v => [v, v]);
    this.squares = values
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        value,
        revealed: false,
        matched: false,
        id: index,
      }));
    this.flippedCards = [];
    this.gameWon = false;
  }

  ngOnInit() {
    this.initGame();
  }

  // Initialiseer het geheugenkaartspel
  initGame() {
    // Kaarten maken met waarden
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    this.cards = [...cardValues, ...cardValues] // Dupliceren van waarden voor paren
      .map(value => ({ value, flipped: false, matched: false })) // Maak objecten voor elke kaart
      .sort(() => Math.random() - 0.5); // Willekeurige volgorde
  }

  // Flip een kaart
  flipCard(index: number) {
    if (this.cards[index].flipped || this.flipped.length === 2 || this.cards[index].matched) {
      return; // Doet niets als de kaart al omgedraaid is of als er al 2 kaarten omgedraaid zijn
    }

    this.cards[index].flipped = true;
    this.flips++;

    this.flipped.push(index);

    if (this.flipped.length === 2) {
      setTimeout(() => this.checkMatch(), 1000); // Controleer of de kaarten overeenkomen na 1 seconde
    }
  }

  // Controleer of de twee omgedraaide kaarten overeenkomen
  checkMatch() {
    const [firstIndex, secondIndex] = this.flipped;
    if (this.cards[firstIndex].value === this.cards[secondIndex].value) {
      this.cards[firstIndex].matched = true;
      this.cards[secondIndex].matched = true;
    } else {
      this.cards[firstIndex].flipped = false;
      this.cards[secondIndex].flipped = false;
    }

    this.flipped = [];

    // Controleer of het spel gewonnen is
    this.gameWon = this.cards.every(card => card.matched);

    if (this.gameWon) {
      alert('Congratulations, you won the game!');
    }
  }

}
