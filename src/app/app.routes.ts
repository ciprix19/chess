import { Routes } from '@angular/router';
import { OtbComponent } from "./otb/otb.component";
import { PuzzlesComponent } from "./puzzles/puzzles.component";
import { OnlineComponent } from "./online/online.component";
import { AnalysisComponent } from "./analysis/analysis.component";
import { MenuComponent } from "./menu/menu.component";

const routeConfig: Routes = [
  {
    path: 'analysis',
    component: AnalysisComponent,
    title: 'Analysis Page'
  },
  {
    path: 'otb',
    component: OtbComponent,
    title: 'OTB Page'
  },
  {
    path: 'puzzles',
    component: PuzzlesComponent,
    title: 'Puzzles Page'
  },
  {
    path: 'online',
    component: OnlineComponent,
    title: 'Online Page'
  },
];

export default routeConfig;
