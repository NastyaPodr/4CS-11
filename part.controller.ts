import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PartService } from '../service/part.service';
import { Part } from '../part.interface';

@Controller('parts')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post(':partId')
  sendPartText(
    @Param('partId') partId: string,
    @Body() body: { text: string, otp: string }
  ): { success: boolean } {
    const { text, otp } = body;
    const isOtpValid = this.partService.verifyPartOtp(partId, otp);
    return { success: isOtpValid };
  }

  @Get()
  getRandomPart(): { imageUrl: string, otp: string, box: { x: number, y: number, width: number, height: number } } {
    const imageUrl = ''; // your image URL logic
    const otp = this.partService.generateOtp();
    const box = { x: 0, y: 0, width: 100, height: 100 }; // example box
    return { imageUrl, otp, box };
  }
}