import { TickerItemList } from './ticker-item-list';
import { Injectable } from '@angular/core';
import { TickerItem } from '../ticker-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BCBCCTDataService {
  bcbBaseUrl = 'http://localhost:4200/';
  bcbGetCurrencyPairValue = 'getTickerCurrencyPairValue?';
  bcbGetExchangeList = 'getExchanges';
  bcbSubscribeTo = 'subscribeToTicker';

  sourceCurrencies = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'ETC'];
  exchangeCurrencyPairs: {[id: string]: string[]} = {
    Coinbase: ['USD', 'GBP', 'EUR'],
    Binance: ['ZAR'],
    Bitfinex: ['JPY']
  };

  constructor(readonly http: HttpClient) {
    this.sourceCurrencies.forEach((source) => {
      const reso = Object.keys(this.exchangeCurrencyPairs).map(async (sourceExchange) => {
        const putURl = this.bcbBaseUrl + this.bcbSubscribeTo;
        const data = {
          exchange: sourceExchange,
          ticker: source,
          pairs: this.exchangeCurrencyPairs[sourceExchange].join(',')
        };
        const res = await this.http.post(putURl, data).toPromise();
      });
    });
  }

  public getData(): TickerItem[] {
    const itemList: TickerItem[] = [];
    this.sourceCurrencies.forEach((source) => {
      Object.keys(this.exchangeCurrencyPairs).forEach((sourceExchange) => {
        const getRequest = this.bcbBaseUrl + this.bcbGetCurrencyPairValue +
        'exchange=' + sourceExchange + '&ticker=' + source +
        '&pairs=' + this.exchangeCurrencyPairs[sourceExchange].join(',');
        console.log(getRequest);
        this.http.get<TickerItem[]>(getRequest).toPromise().then((item) => item.forEach((iitem) => {
          itemList.push(new TickerItem(source, iitem.currency, iitem.value));
        }));
      });
    });
    return itemList;
  }
}
