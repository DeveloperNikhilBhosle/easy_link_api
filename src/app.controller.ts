import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags("HomeController")
export class AppController {
  constructor(private readonly appService: AppService) { }






}
