import { Component, inject } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  standalone: true,
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButton, IonIcon ],
})
export class Tab3Page {
  carrito: any[] = [];
  totalProductos: number = 0;

  constructor() {
    this.obtenerCarrito();
  }

  obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    this.calcularTotal();
  }

  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalProductos = this.carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
  }

  finalizarCompra() {
    alert('¡Gracias por tu compra!');
    this.carrito = [];
    this.totalProductos = 0;
    localStorage.removeItem('carrito');
  }
}
