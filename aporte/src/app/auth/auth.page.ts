import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, RouterModule]
})
export class AuthPage implements OnInit {

  username: string = '';
  password: string = '';
  private storage: Storage;

  

  constructor(private router: Router) {
    this.storage = new Storage();
    this.initStorage();
  }

  async ngOnInit() {}

  async initStorage() {
    await this.storage.create();
  }

  async submit() {
  const allUsers = await this.storage.get('users') || [];

  const user = allUsers.find((u: any) => u.username === this.username && u.password === this.password);
  if (user) {
    await this.storage.set('user', {
      username: user.username,
      token: user.token
    });
    alert(`Bienvenido ${user.username}`);
    this.router.navigate(['/tabs/tab1']);
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

  // Método adicional para obtener el usuario desde el storage (por si lo necesitas)
  async getUser() {
    const user = await this.storage.get('user');
    console.log('Usuario en storage:', user);
  }
}
