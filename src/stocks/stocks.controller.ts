import { Controller, Inject, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService,
    @Inject('SERVER_URL') private readonly SERVER_URL: string,
  ) {}

  @Sse('stream')
  streamStocks(): Observable<MessageEvent> {
    return this.stocksService.stockUpdates().pipe(
      map((update) => {
        const data = JSON.stringify(update.data);
        return {
          data,
          id: Date.now().toString(),
          type: 'stockUpdate',
        } as unknown as MessageEvent;
      }),
    );
  }
}
