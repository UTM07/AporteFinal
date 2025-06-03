import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <- para ngModel
import { Router, RouterLink } from '@angular/router';

// Importa TODOS los módulos de Ionic que estás usando
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonInput, IonItem, IonLabel, ToastController, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonList, IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonButton, IonInput, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent, IonList, IonHeader ],
})
export class Tab1Page {
  productos = [
    {
      nombre: 'Corviches de Manabí',
      precio: 2.5,
      descripcion: 'Deliciosos corviches preparados al estilo tradicional.',
      imagen: 'https://imgs.search.brave.com/kFGSPR2ngdjEE56uVfkuqSrRTKQBA-7JrrPxfAc0aoI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGF5bGl0YS5jb20v/cmVjZXRhcy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wOS9S/ZWNldGEtZGVsLWNv/cnZpY2hlLWRlLXBl/c2NhZG8uanBn',
      cantidad: 1,
    },
    {
      nombre: 'Bolón de verde',
      precio: 2,
      descripcion: 'Bolón con queso o chicharrón, típico desayuno costeño.',
      imagen: 'https://imgs.search.brave.com/AzLp_ClfakcSVI8ZVGHLi3hEtRy8MxmiRljfJBvEXWM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9lY3VhZG9y/aWFuLWJvbG9uLWRl/LXZlcmRlLWdyZWVu/LTI2MG53LTE0NTMw/MjIyOTEuanBn',
      cantidad: 1,
    },
    {
      nombre: 'Ceviche de camarón',
      precio: 3.5,
      descripcion: 'Ceviche fresco con camarones y salsa de tomate.',
      imagen: 'https://imgs.search.brave.com/L-ZTAy9wQ0sMah0Bu1OPamEDotQJ_P8fehh39NfCCmg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlYW50aG9ueWtp/dGNoZW4uY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzA0/L0NldmljaGUtZGUt/Q2FtYXJvbi1QcmVw/LTEyLmpwZw',
      cantidad: 1,
    }
  ];

  constructor(private toastController: ToastController, private router: Router) {}

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
    this.router.navigate(['/tabs/tab3']);


  }
}
