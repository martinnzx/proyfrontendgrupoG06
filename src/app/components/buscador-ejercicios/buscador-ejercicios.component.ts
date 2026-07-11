import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../../services/youtube.service';
import { YoutubeVideo } from '../../models/youtube-video.model';

@Component({
  selector: 'app-buscador-ejercicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador-ejercicios.component.html',
  styleUrl: './buscador-ejercicios.component.css'
})
export class BuscadorEjerciciosComponent {

  query: string = '';
  videos: YoutubeVideo[] = [];
  buscando: boolean = false;
  busquedaRealizada: boolean = false;
  mensajeError: string = '';

  constructor(
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  buscar(): void {
    if (!this.query.trim()) return;

    this.buscando = true;
    this.busquedaRealizada = true;
    this.mensajeError = '';

    this.youtubeService.buscarVideos(this.query).subscribe({
      next: (response: YoutubeVideo[]) => {
        this.buscando = false;
        this.videos = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.buscando = false;
        this.videos = [];
        this.mensajeError = (err.error && err.error.msg) || 'Error al buscar videos. Intentá nuevamente.';
        this.cdr.detectChanges();
      }
    });
  }

  sanitizarUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}
