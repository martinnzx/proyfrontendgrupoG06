import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutinaService } from '../../services/rutina.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-rutinas.html',
})
export class MisRutinasComponent implements OnInit {
  misRutinas: any[] = [];
  cargando: boolean = true;
  mensajeError: string = '';

  constructor(
    private rutinaService: RutinaService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMisRutinas();
  }

  cargarMisRutinas(): void {
    this.cargando = true;
    this.rutinaService.getMisRutinas().subscribe({
      next: (res: any) => {
        this.misRutinas = res;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = 'Error al cargar tus rutinas.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getSafeUrl(url: string): SafeResourceUrl | null {
    if (!url) return null;
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }
    
    if (videoId) {
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    }
    return null;
  }
}
