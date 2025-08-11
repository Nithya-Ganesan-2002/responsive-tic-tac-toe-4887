import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css',
  standalone: true,
})
export class TicTacToeComponent {
  /** Board is a 3x3 matrix. Each cell can be 'X', 'O' or '' */
  board: string[][] = [];
  /** Whose turn ('X' or 'O') */
  currentPlayer: 'X' | 'O' = 'X';
  /** Current game status message */
  statusMessage: string = '';
  /** Array of winning position tuples; if null, no winner */
  winningPositions: Array<[number, number]> | null = null;
  /** Game state: 'playing', 'won', or 'draw' */
  gameState: 'playing' | 'won' | 'draw' = 'playing';

  // PUBLIC_INTERFACE
  constructor() {
    this.startNewGame();
  }

  // PUBLIC_INTERFACE
  startNewGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    this.statusMessage = `Player ${this.currentPlayer}'s turn`;
    this.winningPositions = null;
    this.gameState = 'playing';
  }

  // PUBLIC_INTERFACE
  handleCellClick(row: number, col: number): void {
    if (this.board[row][col] || this.gameState !== 'playing') {
      return;
    }
    this.board[row][col] = this.currentPlayer;
    if (this.isWinningMove(row, col)) {
      this.gameState = 'won';
      this.statusMessage = `Player ${this.currentPlayer} wins!`;
    } else if (this.isDraw()) {
      this.gameState = 'draw';
      this.statusMessage = "It's a draw!";
    } else {
      this.switchPlayer();
      this.statusMessage = `Player ${this.currentPlayer}'s turn`;
    }
  }

  /**
   * Check if the current move is a winning move. Sets winningPositions if so.
   */
  private isWinningMove(row: number, col: number): boolean {
    const b = this.board;
    const p = this.currentPlayer;

    // Rows, columns and diagonals to check
    const lines: Array<[ [number, number], [number, number], [number, number] ]> = [
      // Rows
      [ [row, 0], [row, 1], [row, 2] ],
      // Columns
      [ [0, col], [1, col], [2, col] ],
      // Diagonals
      [ [0, 0], [1, 1], [2, 2] ],
      [ [0, 2], [1, 1], [2, 0] ],
    ];

    for (const line of lines) {
      if (line.every(([r, c]) => b[r][c] === p)) {
        // Highlight this line
        this.winningPositions = line;
        return true;
      }
    }
    return false;
  }

  /** Returns true if all cells are filled and no winner */
  private isDraw(): boolean {
    return this.board.flat().every(cell => cell) && !this.winningPositions;
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  /** Used in template: returns true if cell at (r, c) is a winning position */
  isWinningCell(r: number, c: number): boolean {
    return !!this.winningPositions && this.winningPositions.some(([row, col]) => row === r && col === c);
  }
}
