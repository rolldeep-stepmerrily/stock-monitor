import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { forkJoin, interval, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IStock } from './stocks.interface';

@Injectable()
export class StocksService {
  private accessToken: string;
  private readonly stockCodes: string[] = ['005930', '035720', '035420', '005380', '000660'];
  private readonly stockNames: Record<string, string> = {
    '005930': '삼성전자',
    '035720': '카카오',
    '035420': '네이버',
    '005380': '현대차',
    '000660': 'SK하이닉스',
  };

  constructor(
    @Inject('KIS_KEY') private readonly KIS_KEY: string,
    @Inject('KIS_SECRET') private readonly KIS_SECRET: string,
    private readonly httpService: HttpService,
  ) {
    this.findAccessToken();
  }

  findAccessToken() {
    const url = 'https://openapi.koreainvestment.com:9443/oauth2/tokenP';
    const payload = {
      grant_type: 'client_credentials',
      appkey: this.KIS_KEY,
      appsecret: this.KIS_SECRET,
    };

    this.httpService
      .post<{ access_token: string }>(url, payload)
      .pipe(map((response) => response.data.access_token))
      .subscribe((token) => {
        this.accessToken = token;

        console.log(token);
      });
  }

  stockUpdates(): Observable<{ data: Record<string, IStock> }> {
    return interval(10000).pipe(switchMap(() => this.fetchStocksData()));
  }

  fetchStocksData(): Observable<{ data: Record<string, IStock> }> {
    const requests = this.stockCodes.map((code) => this.fetchStockData(code));

    return forkJoin(requests).pipe(
      map((results) => ({
        data: results.reduce(
          (acc, cur) => {
            acc[cur.symbol] = cur;
            return acc;
          },
          {} as Record<string, IStock>,
        ),
      })),
    );
  }

  fetchStockData(stockCode: string): Observable<IStock> {
    const url = `https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${stockCode}`;

    return this.httpService
      .get<{ output: any }>(url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.accessToken}`,
          appkey: this.KIS_KEY,
          appsecret: this.KIS_SECRET,
          tr_id: 'FHKST01010100',
        },
      })
      .pipe(
        map((response) => {
          const data = response.data.output;
          return {
            symbol: stockCode,
            name: this.mapStockName(stockCode),
            price: data.stck_prpr,
            change: data.prdy_vrss,
            changeRate: data.prdy_ctrt,
          };
        }),
      );
  }

  mapStockName(stockCode: string): string {
    return this.stockNames[stockCode] || 'Unknown';
  }
}
