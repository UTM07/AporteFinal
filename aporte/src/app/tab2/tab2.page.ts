import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <- para ngModel
import { Router, RouterLink } from '@angular/router';

// Importa TODOS los módulos de Ionic que estás usando
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonInput, IonItem, IonLabel, ToastController, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonList, IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonButton, IonInput, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonList, IonHeader ],
})
export class Tab2Page {
  productos = [
    {
      nombre: 'Cuy Hornado',
      precio: 2.5,
      descripcion: 'Cuy de Quito con mote.',
      imagen: 'https://imgs.search.brave.com/4U4WHDpDkTt-0rImmhryNi8VYh0umSWQ5gepDEdFPPs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaG95/dXN1Z2FyLnNtdWdt/dWcuY29tL1NvdXRo/LUFtZXJpY2EvUGVy/dS9DdXNjby9pLWtx/TFJEU0ovMC9TL0lN/R18yMTI2LVMuanBn',
      cantidad: 1,
    },
    {
      nombre: 'Locro de papa',
      precio: 2,
      descripcion: 'Venga, venga buen precio xd.',
      imagen: 'https://imgs.search.brave.com/3Gh5_4YnDBCmseRwiCYZEYRnlTiXlYdk330LzZvqhOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWF4aW9ubGluZS5l/Yy93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OS8wMS9sb2Nyby1k/ZS1wYXBhLTc2OHg1/MTIuanBn',
      cantidad: 1,
    },
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
