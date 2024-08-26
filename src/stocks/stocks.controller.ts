import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StocksService } from './stocks.service';
import { ISse } from './stocks.interface';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Sse('stream')
  streamStocks(): Observable<ISse> {
    const response = this.stocksService.stockUpdates().pipe(
      map((update) => ({
        data: JSON.stringify(update.data),
        id: Date.now().toString(),
        type: 'stockUpdate',
      })),
    );

    console.log(response);

    return response;
  }
}
