import { Component, numberAttribute, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rush-hour',
  templateUrl: './rush-hour.component.html',
  styleUrls: ['./rush-hour.component.css']
})
export class RushHourComponent implements OnInit {
  myBoard: number[][] = [];
  counter: number = 0;
  seconds: number = 0;
  timerInterval: any;
  priorMove: number = 0;

  difficulties = {
    1: [[3,3,7,9,0,0], [2,2,7,9,0,0], [8,1,1,9,0,0], [8,4,4,4,0,0], [8,5,5,0,0,0], [6,6,6,0,0,0]],
    2: [[0,4,0,7,7,7], [2,4,0,8,10,0], [2,1,1,8,10,11], [3,5,5,5,10,11], [3,0,6,0,0,12], [0,0,6,9,9,12]],
    3: [[2,0,0,6,6,6], [2,3,3,7,0,0], [1,1,4,7,0,11], [0,0,4,8,8,11], [0,0,5,9,9,11], [0,0,5,10,10,10]],
    4: [[2,2,6,0,9,9], [3,3,6,0,10,0], [4,0,1,1,10,0], [4,7,7,7,10,11], [4,0,0,8,0,11], [5,5,0,8,12,12]]
  };

  ngOnInit() {
    this.setDifficulty(1);
    this.startTimer();
  }

  setDifficulty(level: 1 | 2 | 3 | 4) {
    this.myBoard = JSON.parse(JSON.stringify(this.difficulties[level]));
    this.counter = 0;
    this.priorMove = 0;
    this.seconds = 0;
  }

  boardClick(row: number, col: number) {
    if (this.myBoard[row][col] !== 0) {
      let length = this.checkLength(row, col);
      if (this.isHorizontal(row, col)) {
        this.moveHorizontal(row, col, length);
      }
      if (this.isVertical(row, col)) {
        this.moveVertical(row, col, length);
      }
      this.updateCounter(row, col);
      this.checkWin();
    }
  }

  isHorizontal(row: number, col: number): boolean {
    return (col > 0 && this.myBoard[row][col] === this.myBoard[row][col - 1]) ||
           (col < 5 && this.myBoard[row][col] === this.myBoard[row][col + 1]);
  }

  isVertical(row: number, col: number): boolean {
    return (row > 0 && this.myBoard[row][col] === this.myBoard[row - 1][col]) ||
           (row < 5 && this.myBoard[row][col] === this.myBoard[row + 1][col]);
  }

  moveHorizontal(row: number, col: number, length: number) {
    if (col < 5 && this.myBoard[row][col + 1] === 0) {
      this.myBoard[row][col + 1] = this.myBoard[row][col];
      this.myBoard[row][col + 1 - length] = 0;
    }
    if (col > 0 && this.myBoard[row][col - 1] === 0) {
      this.myBoard[row][col - 1] = this.myBoard[row][col];
      this.myBoard[row][col - 1 + length] = 0;
    }
  }

  moveVertical(row: number, col: number, length: number) {
    if (row < 5 && this.myBoard[row + 1][col] === 0) {
      this.myBoard[row + 1][col] = this.myBoard[row][col];
      this.myBoard[row + 1 - length][col] = 0;
    }
    if (row > 0 && this.myBoard[row - 1][col] === 0) {
      this.myBoard[row - 1][col] = this.myBoard[row][col];
      this.myBoard[row - 1 + length][col] = 0;
    }
  }

  checkLength(row: number, col: number): number {
    return this.myBoard.flat().filter(val => val === this.myBoard[row][col]).length;
  }

  updateCounter(row: number, col: number) {
    if (this.myBoard[row][col] !== this.priorMove) {
      this.counter++;
    }
    this.priorMove = this.myBoard[row][col];
  }

  checkWin() {
    if (this.myBoard[2][4] === 1 && this.myBoard[2][5] === 1) {
      alert(`Proficiat! Je hebt het opgelost met ${this.counter} zetten in ${this.seconds} seconden!`);
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => this.seconds++, 1000);
  }
}
