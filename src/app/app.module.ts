import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TickerComponent } from './ticker/ticker.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BCBCCTDataService } from './services/bcbcct-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatListModule
  ],
  providers: [HttpClient, BCBCCTDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
