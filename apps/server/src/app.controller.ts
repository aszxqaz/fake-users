import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';

@Controller()
export class AppController {
    @Get()
    index(@Res() res: Response) {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    }
}
