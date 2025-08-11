import { Component } from '@angular/core';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

/**
 * Root component: hosts the Tic Tac Toe game.
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TicTacToeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent { }
