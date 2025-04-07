import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-menu',
  imports: [RouterLink, DialogModule, ButtonModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
  visible: boolean = false;

  showDialog(){
    this.visible = true;

  }

}
