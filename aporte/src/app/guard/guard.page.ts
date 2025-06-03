import { Component, Injectable, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GuardPage implements OnInit {

  constructor(private router: Router, private storage: Storage) {
    this.storage.create(); // Asegúrate que el storage esté listo
  }

  async canActivate(): Promise<boolean> {
    const user = await this.storage.get('user');
    if (user) {
      return true; // ✅ Usuario autenticado
    } else {
      this.router.navigate(['/auth']); // 🚫 Redirigir al login
      return false;
    }
  }

  ngOnInit() {
  }

}
