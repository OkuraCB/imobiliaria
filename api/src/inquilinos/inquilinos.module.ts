import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InquilinosController } from './inquilinos.controller';
import { InquilinosService } from './inquilinos.service';

@Module({
  controllers: [InquilinosController],
  providers: [InquilinosService, PrismaService],
  exports: [InquilinosService],
})
export class InquilinosModule {}
