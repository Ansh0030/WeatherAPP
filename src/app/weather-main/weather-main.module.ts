import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherMainPageRoutingModule } from './weather-main-routing.module';

import { WeatherMainPage } from './weather-main.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherMainPageRoutingModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  declarations: [WeatherMainPage]
})
export class WeatherMainPageModule {}
