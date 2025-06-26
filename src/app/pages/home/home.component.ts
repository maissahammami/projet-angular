import { Component } from '@angular/core';
import { UserService, UserData } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // For message (Envoyer)
  messageUser = '';
  messageMatricule = '';
  message = '';

  // For the user form (CRUD)
  inputUser = '';
  inputMatricule = '';
  inputEmail = '';
  userList: UserData[] = [];
  selectedIndex: number = -1;

  constructor(public userService: UserService) {
    this.userList = this.userService.getUsers();
  }

  // Message send
  sendMessage() {
    this.message = `Bonjour ${this.messageUser} voici votre ${this.messageMatricule}`;
    this.userService.sendMessage({ user: this.messageUser, matricule: this.messageMatricule, email: '' });
  }

  // CRUD functions
  add(user: string, matricule: string, email: string) {
    if (user && matricule && email) {
      this.userService.addUser({ user, matricule, email });
      this.clearInputs();
    }
  }

  modify(index: number, user: string, matricule: string, email: string) {
    if (index !== -1) {
      this.userService.updateUser(index, { user, matricule, email });
      this.clearInputs();
      this.selectedIndex = -1;
    }
  }

  remove(index: number) {
    if (index !== -1) {
      this.userService.deleteUser(index);
      this.clearInputs();
      this.selectedIndex = -1;
    }
  }

  selectUser(index: number) {
    this.selectedIndex = index;
    const selected = this.userList[index];
    this.inputUser = selected.user;
    this.inputMatricule = selected.matricule;
    this.inputEmail = selected.email;
  }

  clearInputs() {
    this.inputUser = '';
    this.inputMatricule = '';
    this.inputEmail = '';
  }
}
