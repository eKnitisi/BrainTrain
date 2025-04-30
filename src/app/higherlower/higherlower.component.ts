import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-higherlower',
  imports: [RouterLink,FormsModule],
  templateUrl: './higherlower.component.html',
  styleUrl: './higherlower.component.css'
})
export class HigherlowerComponent {
  targetNumber!: number;
  guess: number | null = null;
  message: string = '';
  attempts: number = 0;

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.targetNumber = Math.floor(Math.random() * 100) + 1;
    this.guess = null;
    this.message = '';
    this.attempts = 0;
  }

  submitGuess() {
    if (this.guess === null) return;
    this.attempts++;

    if (this.guess === this.targetNumber) {
      this.triggerConfetti();
      this.message = `🎉 Correct! You guessed it in ${this.attempts} tries.`;
    } else if (this.guess < this.targetNumber) {
      this.message = '📉 Too low. Try a higher number.';
    } else {
      this.message = '📈 Too high. Try a lower number.';
    }
  }
  triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.5 } // precies midden van het scherm
    });
  }
}
