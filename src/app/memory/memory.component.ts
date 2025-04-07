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
