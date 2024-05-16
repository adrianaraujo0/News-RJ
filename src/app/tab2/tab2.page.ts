import { Component } from '@angular/core';
import { RjService } from '../news/rj.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [RjService]
})
export class Tab2Page {

  constructor(public rjService: RjService, public loadingController: LoadingController) {}

  async efeitoLoading(){
    const loading = await this.loadingController.create({
      message: 'Carregando Noticias',
      duration: 600,
      spinner: 'crescent'
    });

    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  efeitoRefresh(event: any) {
    this.page = 1;
    //this.lista_noticias = [];
    this.carregaPagina();
    console.log('Iniciando operação assíncrona');

    setTimeout(() => {
      if (event) {
        event.target.complete();
        console.log('Finalizando refresh');
      }
    }, 500);
  }

  public lista_noticias = new Array<any>();
  public page:number = 1;

  carregaPagina() {
    this.rjService.getNewsRj().subscribe({
      next: (data: any) => {
        const response = (data as any);
        if (this.page == 1) {
          this.lista_noticias = response.articles;
        } else {
          this.lista_noticias = this.lista_noticias.concat(response.articles);
        }
        console.log(this.lista_noticias);
      },
      error: (error: any) => {
        console.log('Erro ao carregar notícias do Rio de Janeiro:', error);
      }
    });
  }
  
  ionViewDidEnter() {
    this.efeitoLoading();
    this.carregaPagina();
  }
}
