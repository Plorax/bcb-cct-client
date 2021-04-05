import { TickerItemList } from './../services/ticker-item-list';
import { Component, OnInit } from '@angular/core';
import { BCBCCTDataService } from '../services/bcbcct-data.service';
import { Observable, Subscription, timer } from 'rxjs';
import { TickerItem } from '../ticker-item';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {
  public tickerData: TickerItem[];
  public tickerColumns: string[] = ['currency', 'value'];
  public displayColumns: string[] = ['Currency', 'Value'];

  private subscription: Subscription = new Subscription();
  everyFiveSeconds: Observable<number> = timer(0, 2000);

  constructor(readonly dataService: BCBCCTDataService) {
    this.tickerData = this.dataService.getData();
  }

  getCurrentTime(): string {
    return new Date().toUTCString();
  }

  ngOnInit(): void {
    console.log('ngOnInit Called');

    this.subscription = this.everyFiveSeconds.subscribe(() => {
      const newData = this.dataService.getData();
      newData.forEach((item, index) => {
        this.tickerData[index] = newData[index];
      });
      console.log('updated data from source');
    });
  }
}
