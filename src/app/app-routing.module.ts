import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { ErrorComponent } from './error/error.component';
import { AuthenticateGuard } from './shared/guards/authenticate.guard';
import { CarsResolver } from './shared/resolvers/cars.resolver';
import { WatchListResolver } from './shared/resolvers/watchlist.resolver';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'buy', pathMatch: 'full' },
  { path: 'buy', component: BuyComponent, resolve: {cars: CarsResolver, watchedCars: WatchListResolver}}, 
  { path: 'sell', component: SellComponent, canActivate: [AuthenticateGuard] },
  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthenticateGuard], resolve: {watchedCars: WatchListResolver} },
  { path: 'car/:ownerId/:entryId', loadChildren: () => import('./car/car.module').then((mod) => mod.CarModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule)},
  { path: 'not-found', component: ErrorComponent}, 
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
