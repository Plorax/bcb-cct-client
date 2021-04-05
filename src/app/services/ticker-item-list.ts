import { Observable } from "rxjs";
import { TickerItem } from "../ticker-item";

export class TickerItemList {
  public ticker: string;
  public dataList: Observable<TickerItem[]>;

  constructor(_ticker: string, _dataList: Observable<TickerItem[]>) {
    this.ticker = _ticker;
    this.dataList = _dataList;
  }
}
