import { Injectable } from '@nestjs/common';
import { Part } from '../part.interface';

@Injectable()
export class PartService {
  private parts: Part[] = [];
  private partAccessTokens: string[] = [];

  createPart(text: string, bookId: string): Part {
    const newPart: Part = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      bookId,
    };
    this.parts.push(newPart);
    return newPart;
  }

  generateOtp(): string {
    const otp = Math.random().toString(36).substr(2, 9);
    this.partAccessTokens.push(otp);
    return otp;
  }

  deleteOtp(otp: string): void {
    const index = this.partAccessTokens.indexOf(otp);
    if (index !== -1) {
      this.partAccessTokens.splice(index, 1);
    }
  }

  verifyPartOtp(partId: string, otp: string): boolean {
    const part = this.parts.find(p => p.id === partId);
    if (!part) {
      return false;
    }
    const isOtpValid = this.partAccessTokens.includes(otp);
    this.deleteOtp(otp);
    return isOtpValid;
  }
}