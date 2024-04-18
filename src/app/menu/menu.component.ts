import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
