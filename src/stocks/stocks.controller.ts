import { Controller, Sse } from '@nestjs/common';

import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Sse('sse')
  async sse() {
    return this.stocksService.findStocks();
  }
}
