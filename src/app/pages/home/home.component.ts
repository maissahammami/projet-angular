import { Component } from '@angular/core';
import { UserService, UserData } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  userList: UserData[] = [];
  inputUser = '';
  inputMatricule = '';
  inputEmail = '';
  message = '';

  selectedIndex: number = -1; // Track selected user for update/delete

  constructor(public userService: UserService) {
    this.userList = this.userService.getUsers();
  }

  add(user: string, matricule: string, email: string) {
    if (user && matricule && email) {
      this.userService.addUser({ user, matricule, email });
      this.clearInputs();
    }
  }

  modify(index: number, user: string, matricule: string, email: string) {
    if (index !== -1 && user && matricule && email) {
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

  sendMessage() {
    this.message = `Bonjour ${this.inputUser} voici votre ${this.inputMatricule}`;
    this.userService.sendMessage({ user: this.inputUser, matricule: this.inputMatricule, email: this.inputEmail });
  }

  clearInputs() {
    this.inputUser = '';
    this.inputMatricule = '';
    this.inputEmail = '';
  }
}
