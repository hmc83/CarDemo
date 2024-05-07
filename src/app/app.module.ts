import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { FilterComponent } from './buy/filter/filter.component';
import { CarsListComponent } from './buy/cars-list/cars-list.component';
import { CarPreviewComponent } from './buy/cars-list/car-preview/car-preview.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppSharedModule } from './shared/app-shared.module';
import { WatchlistComponent } from './watchlist/watchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BuyComponent,
    SellComponent,
    FilterComponent,
    CarsListComponent,
    CarPreviewComponent,
    ErrorComponent,
    WatchlistComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
