import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <- para ngModel
import { Router, RouterLink } from '@angular/router';

// Importa TODOS los módulos de Ionic que estás usando
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonInput, IonItem, IonLabel, ToastController, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonList, IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonButton, IonInput, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonList, IonHeader ],
})
export class Tab4Page {
  productos = [
    {
      nombre: 'Encebollado de pescado',
      precio: 2.5,
      descripcion: 'Cuy de Quito con mote.',
      imagen: 'https://imgs.search.brave.com/YPFhN8f7QjujCdvRlYRIohtSKZlv7vGpH3eKEqgp6xI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcGlj/ZWJyZWV6ZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDEvRW5jZWJvbGxh/ZG8tMS5qcGc',
      cantidad: 1,
    }
  ];

  constructor(private toastController: ToastController, private route: Router) {}

  async anadirAlCarrito(producto: any) {
    const cantidad = parseInt(producto.cantidad, 10);

    if (!cantidad || cantidad < 1) {
      this.mostrarToast('La cantidad debe ser mayor a 0');
      return;
    }

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const existente = carrito.find((p: any) => p.nombre === producto.nombre);

    if (existente) {
      this.mostrarToast('Este producto ya está en el carrito');
      return;
    }

    carrito.push({ ...producto, cantidad });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.mostrarToast('Producto añadido al carrito');
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  // Si tienes este método en el template, crea uno básico para que no falle
  irAlCarrito() {
    this.route.navigate(['/tabs/tab3']);
  }
}
