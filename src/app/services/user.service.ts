import { Injectable } from '@angular/core';

export interface UserData {
  user: string;
  matricule: string;
  email: string;
  date?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  users: UserData[] = [];
  history: UserData[] = [];

  getUsers() {
    return this.users;
  }

  addUser(user: UserData) {
    this.users.push(user);
  }

  updateUser(index: number, user: UserData) {
    this.users[index] = user;
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

  sendMessage(msg: UserData) {
    msg.date = new Date().toLocaleString();
    msg.message = `Bonjour ${msg.user} voici votre ${msg.matricule}`;
    this.history.push(msg);
  }

  getHistory() {
    return this.history;
  }
}
