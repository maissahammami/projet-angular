import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
})
export class HistoriqueComponent {
  historyList = this.userService.getHistory();

  constructor(private userService: UserService) {}
}