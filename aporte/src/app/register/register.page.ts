import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonSelect, IonSelectOption, RouterModule ]
})
export class RegisterPage implements OnInit {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  role: string = '';

  private storage: Storage;

  constructor(private router: Router) {
    this.storage = new Storage();
    this.initStorage();
  }

  async ngOnInit() { }

  async initStorage() {
    await this.storage.create();
  }

  async register() {
    if (!this.username || !this.password || !this.confirmPassword || !this.name || !this.role) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const existingUsers = await this.storage.get('users') || [];

    const exists = existingUsers.find((u: any) => u.username === this.username);
    if (exists) {
      alert('El usuario ya existe.');
      return;
    }

    const newUser = {
      username: this.username,
      password: this.password,
      name: this.name,
      role: this.role,
      token: Math.random().toString(36).substring(2)
    };

    existingUsers.push(newUser);
    await this.storage.set('users', existingUsers);

    alert('Usuario registrado exitosamente');
    this.router.navigate(['/']);
  }
}
