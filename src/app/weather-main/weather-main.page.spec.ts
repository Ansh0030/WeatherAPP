import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherMainPage } from './weather-main.page';

describe('WeatherMainPage', () => {
  let component: WeatherMainPage;
  let fixture: ComponentFixture<WeatherMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
