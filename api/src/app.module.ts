import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ProprietariosModule } from './proprietarios/proprietarios.module';
import { UsersModule } from './users/users.module';
import { InquilinosModule } from './inquilinos/inquilinos.module';

@Module({
  imports: [AuthModule, UsersModule, ProprietariosModule, InquilinosModule],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class AppModule {}
