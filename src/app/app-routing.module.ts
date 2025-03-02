import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo : '/weather-main',
    pathMatch : 'full'
  },
  {
    path: 'weather-main',
    loadChildren: () => import('./weather-main/weather-main.module').then( m => m.WeatherMainPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
