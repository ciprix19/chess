import { Component } from '@angular/core';
import { ChessboardComponent } from "../chessboard/chessboard.component";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-otb',
  standalone: true,
  imports: [
    ChessboardComponent,
    FormsModule,
    CommonModule
  ],
  providers: [DatePipe],
  templateUrl: './otb.component.html',
  styleUrl: './otb.component.css'
})
export class OtbComponent {
  selectedOption: string = '5 + 0';
  options: string[] = ['1 + 0', '3 + 0', '3 + 2', '5 + 0', '5 + 2', '10 + 0', '10 + 5'];
  increment!: number;
  player1Time: string = '05:00';
  player2Time: string = '05:00';

  constructor(private datePipe: DatePipe) { }

  startGame() {

  }

  formatTime(milliseconds: number): string {
    const date = new Date(milliseconds);
    return this.datePipe.transform(date, 'mm:ss') || '';
  }

  updateClocks() {
    const minutes = Number(this.selectedOption.split(' + ')[0]);
    const milliseconds = minutes * 60 * 1000; // Convert minutes to milliseconds
    this.player1Time = this.formatTime(milliseconds);
    this.player2Time = this.formatTime(milliseconds);
  }
}
