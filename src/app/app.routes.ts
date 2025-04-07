import { Routes } from '@angular/router';
import { RushHourComponent } from './rush-hour/rush-hour.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HomeComponent } from './home/home.component';
import { MemoryComponent } from './memory/memory.component';
import { RockpaperscissorsComponent } from './rockpaperscissors/rockpaperscissors.component';
import { HigherlowerComponent } from './higherlower/higherlower.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: "rushhour", component: RushHourComponent},
    {path: "mainmenu", component: MainMenuComponent},
    {path: "memory", component: MemoryComponent},
    {path: "rockpaperscissors", component: RockpaperscissorsComponent},
    {path: "higherlower", component: HigherlowerComponent},
];
