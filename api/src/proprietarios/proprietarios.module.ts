import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProprietariosController } from './proprietarios.controller';
import { ProprietariosService } from './proprietarios.service';

@Module({
  controllers: [ProprietariosController],
  providers: [ProprietariosService, PrismaService],
  exports: [ProprietariosService],
})
export class ProprietariosModule {}
