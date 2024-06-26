// rj.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RjService {

  private apiKey = "fbe2fb09498146e2af3c97a291ea71ee";
  private baseUrl = "https://newsapi.org/v2/everything";
  private query = "Rio de Janeiro";
  private sortBy = "publishedAt"; // Classificar por data de publicação

  constructor(public http: HttpClient) { }

  public getNewsRj(page: number = 1) {
    const url = `${this.baseUrl}?q=${this.query}&sortBy=${this.sortBy}&apiKey=${this.apiKey}&page=${page}`;
    return this.http.get(url);
  }
}


//https://newsapi.org/v2/everything?q=Rio%20de%20Janeiro&sortBy=publishedAt&apiKey=fbe2fb09498146e2af3c97a291ea71ee&page=1