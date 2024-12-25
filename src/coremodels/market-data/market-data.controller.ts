import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { bhav_copy_ip } from './market-data.dto';

@Controller('api')
@ApiTags("Market Data Service")
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) { }

  @Post("bhav-copy")
  @HttpCode(200)
  @HttpCode(404)
  @ApiOperation({
    summary: 'Closing Bhav Copy Price Calculation API',
    description: 'This API retrieves the respective dates closing bhav copy price for all listed companies from the Bombay Stock Exchange (BSE) India. \n\n The API takes a date in the format `yyyyMMdd`, along with pagination parameters `page_no` and `page_size`, and returns the paginated closing prices for the listed companies for that date. \n\n' +
      ' <b>Request Body (JSON): </b>' +
      ' \n\n <li><b>date:</b> string (The date for which to fetch the closing prices in the format yyyyMMdd, e.g., "20241224")</li>' +
      ' \n\n <li><b>page_no:</b> number (The page number for pagination, e.g., 1)</li>' +
      '\n\n <li><b>page_size:</b> number (The number of records per page for pagination, e.g., 2)</li>' +

      '\n\n <b> Response (Paginated Data): </b>' +
      '\n\n <li><b>total:</b> number (Total number of records available for the given date)</li> ' +
      '\n\n <li><b>records:</b> array (An array of company details for the respective date, including ISIN, stock symbols, prices)</li> ' +

      '\n\n <b> Each record includes: </b>' +
      '\n\n <li><b>ISIN:</b> string (The International Securities Identification Number for the company, e.g., "INE117A01022")</li> ' +
      '\n\n  <li><b>TckrSymb:</b> string (The stock ticker symbol for the company, e.g., "ABB")</li> ' +
      '\n\n <li><b>FinInstrmNm:</b> string (The full name of the company, e.g., "ABB INDIA LIMITED")</li>' +
      '\n\n <li><b>OpnPric:</b> string (Opening price for the stock on that date, e.g., "6960.15")</li> ' +
      '\n\n <li><b>HghPric:</b> string (Highest price of the stock on that date, e.g., "7009.95")</li> ' +
      '\n\n <li><b>LwPric:</b> string (Lowest price of the stock on that date, e.g., "6840.95")</li> ' +
      '\n\n <li><b>ClsPric:</b> string (Closing price of the stock on that date, e.g., "6877.45")</li> ' +
      '\n\n <li><b>LastPric:</b> string (Last traded price of the stock on that date, e.g., "6877.45")</li> ' +
      '\n\n <li><b>SttlmPric:</b> string (Settlement price of the stock on that date, e.g., "6878.15")</li> ',
  })
  async getBhavCopy(@Body() request: bhav_copy_ip) {
    return await this.marketDataService.getBhavCopy(request);
  }

}
