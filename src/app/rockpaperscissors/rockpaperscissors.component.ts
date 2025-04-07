import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-rockpaperscissors',
  imports: [UpperCasePipe, RouterLink],
  templateUrl: './rockpaperscissors.component.html',
  styleUrl: './rockpaperscissors.component.css'
})
export class RockpaperscissorsComponent {
    userChoice: string = '';
    computerChoice: string = '';
    result: string = '';
    choices: string[] = ['rock', 'paper', 'scissors'];
    countdown: number = 3;
    timer: any;
    gameStarted: boolean = false;

    play(choice: string) {
      this.userChoice = choice;
      this.gameStarted = true;
      this.startCountdown();
    }
  
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
          this.computerChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
          this.result = this.determineWinner();
        }
      }, 1000);
    }
  
    determineWinner(): string {
      if (this.userChoice === this.computerChoice) {
        return 'It\'s a tie!';
      }
      if (
        (this.userChoice === 'rock' && this.computerChoice === 'scissors') ||
        (this.userChoice === 'paper' && this.computerChoice === 'rock') ||
        (this.userChoice === 'scissors' && this.computerChoice === 'paper')
      ) {
        return 'You win!';
      } else {
        return 'Computer wins!';
      }
    }

    playAgain() {
      this.userChoice = '';
      this.computerChoice = '';
      this.result = '';
      this.countdown = 3;
      this.gameStarted = false;
      clearInterval(this.timer);
    }
  }
