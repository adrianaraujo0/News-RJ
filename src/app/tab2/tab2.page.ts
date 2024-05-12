// tab2.page.ts
import { Component } from '@angular/core';
import { RjService } from '../news/rj.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [RjService]
})
export class Tab2Page {

  constructor(public rjService: RjService) {}

  public lista_noticias = new Array<any>();

  carregaPagina() {
    this.rjService.getNewsRj().subscribe(
      (data: any) => {
        const response = (data as any);
        this.lista_noticias = this.lista_noticias.concat(response.articles); // Corrigido para acessar 'articles' em vez de 'results'
        console.log(this.lista_noticias);
      },
      (error: any) => {
        console.log('Erro ao carregar notícias do Rio de Janeiro:', error);
      }
    );
  }

  ionViewDidEnter() {
    this.carregaPagina();
  }
}
