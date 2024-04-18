import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChessGame, Piece, PieceColor, PieceType} from "../chess-game";
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chessboard',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './chessboard.component.html',
  styleUrl: './chessboard.component.css'
})

export class ChessboardComponent implements OnInit {
  game!: ChessGame;
  board!: Piece[][];
  validMoves!: number[][];
  // true is White, false is Black
  turn = true;

  // change these back after finishing game logic! todo
  // digits: string[] = ['8', '7', '6', '5', '4', '3', '2', '1'];
  // letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7'];
  letters: string[] = ['0', '1', '2', '3', '4', '5', '6', '7'];

  constructor() {
  }

  ngOnInit() {
    this.game = new ChessGame();
    this.board = this.game.getBoard()
  }

  getPieceSymbol(piece: Piece): string {
    switch (piece.type) {
      case PieceType.King:
        return piece.color === PieceColor.White ? '♔' : '♚';
      case PieceType.Queen:
        return piece.color === PieceColor.White ? '♕' : '♛';
      case PieceType.Rook:
        return piece.color === PieceColor.White ? '♖' : '♜';
      case PieceType.Bishop:
        return piece.color === PieceColor.White ? '♗' : '♝';
      case PieceType.Knight:
        return piece.color === PieceColor.White ? '♘' : '♞';
      case PieceType.Pawn:
        return piece.color === PieceColor.White ? '♙' : '♟';
      default:
        return '';
    }
  }

  removeHighlightSquares(): void {
    const highlightedSquares = document.querySelectorAll('.highlight');
    highlightedSquares.forEach(square => square.classList.remove('highlight'));
  }

  highlightSquares(validMoves: number[][]): void {
    this.removeHighlightSquares();
    // Add highlights to valid move squares
    validMoves.forEach(move => {
      const square = document.querySelector(`[data-row="${move[0]}"][data-col="${move[1]}"]`);
      if (square) {
        square.classList.add('highlight');
      }
    });
  }

  // get valid moves in a list
  // highlight available squares
  // based upon the list, verify the moves the player makes
  clickedRow: number = -1;
  clickedCol: number = -1;
  clickedPiece: Piece = { type: PieceType.Empty, color: PieceColor.Empty };
  handleSquareClick(piece: Piece, row: number, col: number) {
    this.removeHighlightSquares();
    if (this.clickedPiece.type !== PieceType.Empty) {
      this.board = this.game.movePiece(this.clickedPiece, this.clickedRow, this.clickedCol, row, col, this.validMoves);
      this.turn = !this.turn;
      this.clickedRow = -1;
      this.clickedCol = -1;
      this.clickedPiece = { type: PieceType.Empty, color: PieceColor.Empty };
    }
  }

  handlePieceClick(piece: Piece, row: number, col: number) {
    this.removeHighlightSquares();
    if (this.clickedPiece.type == PieceType.Empty) {
      this.clickedPiece = piece;
      this.clickedCol = col;
      this.clickedRow = row;
      this.validMoves = this.game.getValidMoves(piece, row, col);
      this.highlightSquares(this.validMoves);
    } else {
        this.game.movePiece(this.clickedPiece, this.clickedRow, this.clickedCol, row, col, this.validMoves)
        this.turn = !this.turn;
        this.board = this.game.getBoard();
        this.clickedRow = -1;
        this.clickedCol = -1;
        this.clickedPiece = { type: PieceType.Empty, color: PieceColor.Empty };
    }
  }
}
