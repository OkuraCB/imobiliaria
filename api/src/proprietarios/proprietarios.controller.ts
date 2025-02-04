import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AssignCorretorDto } from './dto/body/assignCorretor.dto';
import { CreateCertificateDto } from './dto/body/createCertificate.dto';
import { CreateCorretorDto } from './dto/body/createCorretor.dto';
import { CreateNumberDto } from './dto/body/createNumber.dto';
import { CreatePropertyDto } from './dto/body/createProperty.dto';
import { CreateProprietarioDto } from './dto/body/createProprietario.dto';
import { UpdateProprietarioDto } from './dto/body/updateProprietario.dto';
import { ImovelDto } from './dto/expose/imovel.dto';
import { ProprietarioDto } from './dto/expose/proprietario.dto';
import { TelefoneDto } from './dto/expose/telefone.dto';
import { ProprietariosService } from './proprietarios.service';

// @UseGuards(JwtAuthGuard)
@Controller('/proprietario')
export class ProprietariosController {
  constructor(private proprietarioService: ProprietariosService) {}

  @Get()
  @Serialize(ProprietarioDto)
  async listAll() {
    try {
      return await this.proprietarioService.list();
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/corretor')
  @Serialize(ProprietarioDto)
  async addCorretor(@Body() body: CreateCorretorDto) {
    try {
      return await this.proprietarioService.createCorretor(body);
    } catch (e) {
      console.log(e);
    }
  }

  @Post()
  @Serialize(ProprietarioDto)
  async addProprietario(@Body() body: CreateProprietarioDto) {
    try {
      return await this.proprietarioService.create(body);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch('/:id')
  @Serialize(ProprietarioDto)
  async updateProprietario(
    @Param('id') id: number,
    @Body() body: UpdateProprietarioDto,
  ) {
    try {
      return await this.proprietarioService.update(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete('/:id')
  @Serialize(ProprietarioDto)
  async deleteProprietario(@Param('id') id: number) {
    try {
      return await this.proprietarioService.delete(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/number/:id')
  @Serialize(TelefoneDto)
  async addNumber(@Param('id') id: number, @Body() body: CreateNumberDto) {
    try {
      return await this.proprietarioService.registerNumber(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/certificate/:id')
  @Serialize(TelefoneDto)
  async addCertificate(
    @Param('id') id: number,
    @Body() body: CreateCertificateDto,
  ) {
    try {
      return await this.proprietarioService.registerCerticate(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/property/:id')
  @Serialize(TelefoneDto)
  async addProperty(@Param('id') id: number, @Body() body: CreatePropertyDto) {
    try {
      return await this.proprietarioService.registerProperty(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch('/corretor/:id')
  @Serialize(ImovelDto)
  async assignCorretor(
    @Param('id') id: number,
    @Body() body: AssignCorretorDto,
  ) {
    try {
      return await this.proprietarioService.assignCorretor(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/generate')
  async generateData() {
    try {
      return await this.proprietarioService.generateData();
    } catch (e) {
      console.log(e);
    }
  }
}
