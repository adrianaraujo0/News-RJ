import { Component } from '@angular/core';
import { TempoService } from '../clima/tempo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cityName: string = ''; 
  weatherData: any;
  weatherSubscription: Subscription | undefined;

  constructor(private TempoService: TempoService) {}

  searchWeather() {
    if (this.cityName.trim() !== '') { 
      this.weatherData = null;
      
      this.weatherSubscription = this.TempoService.getWeatherByCity(this.cityName).subscribe({
        next: (data) => {
          this.weatherData = data;
        },
        error: (error) => {
          console.error('Error getting weather data', error);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }
}
