export enum PieceColor {
  Empty = '',
  White = 'white',
  Black = 'black'
}

export enum PieceType {
  Empty = '',
  King = 'king',
  Queen = 'queen',
  Rook = 'rook',
  Bishop = 'bishop',
  Knight = 'knight',
  Pawn = 'pawn'
}

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export class ChessGame {
  private board: Piece[][] = [];

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard(): void {
    this.board = [];

    // Initialize empty board
    for (let i = 0; i < 8; i++) {
      // this.board.push(Array(8).fill(null));
      this.board.push(Array(8).fill({ type: PieceType.Empty, color: PieceColor.Empty }));
    }

    // Place white pieces
    this.board[0][0] = { type: PieceType.Rook, color: PieceColor.Black };
    this.board[0][1] = { type: PieceType.Knight, color: PieceColor.Black };
    this.board[0][2] = { type: PieceType.Bishop, color: PieceColor.Black };
    this.board[0][3] = { type: PieceType.Queen, color: PieceColor.Black };
    this.board[0][4] = { type: PieceType.King, color: PieceColor.Black };
    this.board[0][5] = { type: PieceType.Bishop, color: PieceColor.Black };
    this.board[0][6] = { type: PieceType.Knight, color: PieceColor.Black };
    this.board[0][7] = { type: PieceType.Rook, color: PieceColor.Black };
    for (let i = 0; i < 8; i++) {
      this.board[1][i] = { type: PieceType.Pawn, color: PieceColor.Black };
    }

    // Place black pieces
    this.board[7][0] = { type: PieceType.Rook, color: PieceColor.White };
    this.board[7][1] = { type: PieceType.Knight, color: PieceColor.White };
    this.board[7][2] = { type: PieceType.Bishop, color: PieceColor.White };
    this.board[7][3] = { type: PieceType.Queen, color: PieceColor.White };
    this.board[7][4] = { type: PieceType.King, color: PieceColor.White };
    this.board[7][5] = { type: PieceType.Bishop, color: PieceColor.White };
    this.board[7][6] = { type: PieceType.Knight, color: PieceColor.White };
    this.board[7][7] = { type: PieceType.Rook, color: PieceColor.White };
    for (let i = 0; i < 8; i++) {
      this.board[6][i] = { type: PieceType.Pawn, color: PieceColor.White };
    }
  }

  getBoard(): Piece[][] {
    return this.board;
  }

  isEnemy(piece1: Piece, piece2: Piece) : boolean {
    return piece1.color !== piece2.color
  }

  checkIfEnemy(piece1: Piece, piece2: Piece) : boolean {
    if (piece2.type !== PieceType.Empty) {
      return this.isEnemy(piece1, piece2);
    }
    return false;
  }

  getValidMoves(piece: Piece, row: number, col: number): number[][] {
    switch (piece.type) {
      case PieceType.Pawn:
        return this.getValidPawnMoves(piece, row, col);
      case PieceType.Knight:
        return this.getValidKnightMoves(piece, row, col);
      case PieceType.Bishop:
        return this.getValidBishopMoves(piece, row, col);
      case PieceType.Rook:
        return this.getValidRookMoves(piece, row, col);
      case PieceType.Queen:
        return this.getValidQueenMoves(piece, row, col);
      case PieceType.King:
        return this.getValidKingMoves(piece, row, col)
      default:
        return [];
    }
  }

  movePiece(clickedPiece: Piece, clickedRow: number, clickedCol: number, row: number, col: number, validMoves: number[][]): Piece[][] {
    for (const move of validMoves) {
      if (move[0] == row && move[1] == col) {
        this.board[clickedRow][clickedCol] = { type: PieceType.Empty, color: PieceColor.Empty };
        // promotion
        if (clickedPiece.type === PieceType.Pawn) {
          if (row === 7 && clickedPiece.color === PieceColor.Black) {
            this.board[row][col] = { type: PieceType.Queen, color: PieceColor.Black };
          } else if (row === 0 && clickedPiece.color === PieceColor.White) {
            this.board[row][col] = { type: PieceType.Queen, color: PieceColor.White };
          } else {
            this.board[row][col] = clickedPiece;
          }
        } else {
          this.board[row][col] = clickedPiece;
        }
      }
    }
    return this.board;
  }

  // for bishop, queen, rook
  moveHowFarYouWant(piece: Piece, directions: number[][], row: number, col: number): number[][] {
    const validMoves: number[][] = [];
    for (const direction of directions) {
      let newRow = row + direction[0];
      let newCol = col + direction[1];

      while (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
        const destinationPiece = this.board[newRow][newCol];
        if (destinationPiece.type === PieceType.Empty) {
          validMoves.push([newRow, newCol]);
        } else {
          if (this.isEnemy(piece, destinationPiece)) {
            validMoves.push([newRow, newCol]);
          }
          break;
        }
        newRow += direction[0];
        newCol += direction[1];
      }
    }
    return validMoves;
  }

  // for king and knight
  moveAroundYou(piece: Piece, directions: number[][], row: number, col: number): number[][] {
    const validMoves: number[][] = [];
    for (const move of directions) {
      const newRow = row + move[0];
      const newCol = col + move[1];
      // Check if the move is within the bounds of the chessboard
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        // Check if the destination square is empty or occupied by an opponent's piece
        const destination = this.board[newRow][newCol];
        // if (destination.type !== PieceType.Empty || this.isEnemy(piece, destination)) {
        if (!destination || this.isEnemy(piece, destination)) {
          // Add the valid move to the list of valid moves
          validMoves.push([newRow, newCol]);
        }
      }
    }
    return validMoves;
  }

  getValidKingMoves(piece: Piece, row: number, col: number): number[][] {
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
    return this.moveAroundYou(piece, directions, row, col);
  }

  getValidQueenMoves(piece: Piece, row: number, col: number): number[][] {
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
    return this.moveHowFarYouWant(piece, directions, row, col);
  }

  getValidRookMoves(piece: Piece, row: number, col: number): number[][] {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    return this.moveHowFarYouWant(piece, directions, row, col);
  }

  getValidBishopMoves(piece: Piece, row: number, col: number): number[][] {
    const validMoves: number[][] = [];
    // define bishop directions
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    return this.moveHowFarYouWant(piece, directions, row, col);
  }

  getValidKnightMoves(piece: Piece, row: number, col: number): number[][] {
    const validMoves: number[][] = [];
    // define all possible knight moves relative to its current position
    const directions = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    return this.moveAroundYou(piece, directions, row, col);
  }

  getValidPawnMoves(piece: Piece, row: number, col: number): number[][] {
    const validMoves: number[][] = [];
    if (piece.color === PieceColor.Black) {
      // push 1 square
      if (this.board[row + 1][col].type === PieceType.Empty) {
        validMoves.push([row + 1, col]);
      }
      // push 2 squares rule
      if (row === 1 && this.board[3][col].type === PieceType.Empty) {
        validMoves.push([3, col]);
      }
      //  check if I can capture
      if (col == 0 && this.checkIfEnemy(piece, this.board[row + 1][col + 1])) {
        validMoves.push([row + 1, col + 1]);
      }
      if (col == 7 && this.checkIfEnemy(piece, this.board[row + 1][col - 1])) {
        validMoves.push([row + 1, col - 1]);
      }
      if (col > 0 && col < 7) {
        if (this.checkIfEnemy(piece, this.board[row + 1][col - 1])){
          validMoves.push([row + 1, col - 1]);
        }
        if (this.checkIfEnemy(piece, this.board[row + 1][col + 1])) {
          validMoves.push([row + 1, col + 1]);
        }
      }
    } else {
      // push 1 square
      if (this.board[row - 1][col].type === PieceType.Empty) {
        validMoves.push([row - 1, col]);
      }
      // push 2 squares rule
      if (row === 6 && this.board[5][col].type === PieceType.Empty) {
        validMoves.push([4, col]);
      }
      //  check if I can capture
      if (col == 0 && this.checkIfEnemy(piece, this.board[row - 1][col + 1])) {
        validMoves.push([row - 1, col + 1]);
      }
      if (col == 7 && this.checkIfEnemy(piece, this.board[row - 1][col - 1])) {
        validMoves.push([row - 1, col - 1]);
      }
      if (col != 0 && col != 7) {
        if (this.checkIfEnemy(piece, this.board[row - 1][col - 1])) {
          validMoves.push([row - 1, col - 1]);
        }
        if (this.checkIfEnemy(piece, this.board[row - 1][col + 1])) {
          validMoves.push([row - 1, col + 1]);
        }
      }
    }
    return validMoves;
  }
}
