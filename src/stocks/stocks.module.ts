import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [HttpModule],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
