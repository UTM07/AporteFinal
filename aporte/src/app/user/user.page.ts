import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton]
})
export class UserPage implements OnInit {
  user: any = null;
  private storage: Storage;

  constructor(private router: Router) {
    this.storage = new Storage();
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    const storedUser = await this.storage.get('user');
    if (!storedUser) {
      this.router.navigate(['/auth']);
    } else {
      this.user = storedUser;
    }
  }

  ngOnInit() {}

  async logout() {
  await this.storage.remove('user');
  this.router.navigate(['/']);
  }
}
