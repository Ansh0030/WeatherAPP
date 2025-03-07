import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.page.html',
  styleUrls: ['./weather-main.page.scss'],
})
export class WeatherMainPage implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;
  @ViewChild("chart") chart!: ChartComponent;

  // Initialize chartOptions with empty values to prevent undefined errors
  public chartOptions: any ;

  constructor(private http: HttpClient){}

  ngOnInit() {
    if(!this.cityName){
      this.getCurrentLocation();
    }else{
      this.weatherDataAPI();
    }
    this.chartOptions =
      {
        series: [
          {
            name: "Tempreture",
          },
        ],
        chart: {
          height: 250,
          type: "line",
        },
        stroke: {
          width: 5,
          curve: "smooth",
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "vertical",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 70, 40],
          },
        },
        markers: {
          size: 2,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 1,
          hover: {
            size: 2,
          },
        },
        yaxis: {
          min: -10,
          max: 40,
        },
      };
    this.initializeChart();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cityName']) {
      this.weatherDataAPI();
    }
  }

  initializeChart() {
    this.chartOptions = { 
      ...this.chartOptions, // Retain initial structure
      series: [
        {
          name: "Likes",
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
        },
      ],
      title: { text: "Social Media" },
    };
  }

  API_KEY: string = "c2bfc7fd5e015418b37692767396534f";
  cityName !: string;
  weatherData: any;
  dayLight: boolean = false;
  nightLight: boolean = false;
  cloudy: boolean = false;
  currentTime: string = "";
  timeZone: any;
  inputFieldValue : any;

  getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}&units=metric`;
          this.http.get(url).subscribe(
            (response: any) => {
              this.cityName = response.name;
              this.weatherData = response;
              this.timeZone = this.weatherData.timezone;
              this.toGetTimeByOffset(this.timeZone);
              this.toGetWeather();
            },
            (error) => {
              console.error("Error fetching weather data:", error);
              // alert("Location not found! Please try again.");
            }
          );
        },
        (error) => {
          console.error("Error getting location:", error.message);
        },
        {
          enableHighAccuracy: true, // Use GPS for better accuracy
          timeout: 5000, // Wait max 5 seconds
          maximumAge: 0 // Do not cache the location
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  
  onChangeCityName(){
    this.cityName = '';
  }

  setCityName(){
    this.cityName = this.inputFieldValue;
  }

  weatherDataAPI() {
    if (!this.cityName) {
      // alert("Please enter a city name.");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.API_KEY}&units=metric`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.weatherData = response;
        this.timeZone = this.weatherData.timezone;
        this.toGetTimeByOffset(this.timeZone);
        this.toGetWeather();
      },
      (error) => {
        console.error("Error fetching weather data:", error);
        // alert("City not found! Please try again.");
      }
    );
  }

  toGetWeather() {
    if (!!this.weatherData && this.currentTime) {
      const isDayTime = this.currentTime >= '06:00:00' && this.currentTime < '18:00:00';

      if (
        (this.weatherData.weather[0].main === 'Clouds' ||
          this.weatherData.weather[0].main === 'Snow' ||
          this.weatherData.weather[0].main === 'Rain') &&
        isDayTime
      ) {
        this.cloudy = true;
        this.dayLight = false;
        this.nightLight = false;
      } else if (
        (this.weatherData.weather[0].main === 'Clear' ||
          this.weatherData.weather[0].main === 'Haze') &&
        isDayTime
      ) {
        this.dayLight = true;
        this.cloudy = false;
        this.nightLight = false;
      } else {
        this.nightLight = true;
        this.dayLight = false;
        this.cloudy = false;
      }
    }
  }

  todayDate : any;
  toGetTimeByOffset(offsetInSeconds: number) {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add one day
    this.todayDate = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const localTime = new Date(now.getTime() + offsetInSeconds * 1000);
    this.currentTime = localTime.toISOString().slice(11, 19);
  }
}
