import { Component } from '@angular/core';
import { TempoService } from '../clima/tempo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  nomeCidade: string = ''; 
  dadosMeteorologicos: any;
  assinaturaMeteorologica: Subscription | undefined;
  erro: string = '';
  

  constructor(private tempoService: TempoService) {}

  pesquisarClima() {
    if (this.nomeCidade.trim() !== '') { 
      this.dadosMeteorologicos = null;
      this.erro = '';
      
      this.assinaturaMeteorologica = this.tempoService.obterClimaPorCidade(this.nomeCidade).subscribe({
        next: (data) => {
          this.dadosMeteorologicos = data;
        },
        error: (error) => {
          console.error('Erro ao obter dados meteorológicos', error);
          if (error.status === 404) {
            this.erro = 'Cidade não encontrada. Por favor, verifique o nome da cidade e tente novamente.';
          } else {
            this.erro = 'Erro ao obter dados meteorológicos. Por favor, tente novamente mais tarde.';
          }
        } 
      });
    } else {
      this.erro = 'Por favor, insira o nome da cidade.';
    }
  }

  ngOnDestroy() {
    if (this.assinaturaMeteorologica) {
      this.assinaturaMeteorologica.unsubscribe();
    }
  }

  formatarHora(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }
}
