import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateContratoDto } from './dto/body/createContrato.dto';
import { CreateInquilinoDto } from './dto/body/createInquilino.dto';
import { CreatePropostaDto } from './dto/body/createProposta.dto';
import { CreateVisitaDto } from './dto/body/createVisita.dto';
import { UpdateInquilinoDto } from './dto/body/updateInquilino.dto';
import { InquilinoDto } from './dto/expose/inquilino.dto';
import { VisitaDto } from './dto/expose/visita.dto';
import { InquilinosService } from './inquilinos.service';

@UseGuards(JwtAuthGuard)
@Controller('/inquilino')
export class InquilinosController {
  constructor(private inquilinoService: InquilinosService) {}

  @Get()
  @Serialize(InquilinoDto)
  async listAll() {
    try {
      return await this.inquilinoService.list();
    } catch (e) {
      console.log(e);
    }
  }

  @Post()
  @Serialize(InquilinoDto)
  async addInquilino(@Body() body: CreateInquilinoDto) {
    try {
      return await this.inquilinoService.create(body);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch('/:id')
  @Serialize(InquilinoDto)
  async updateInquilino(
    @Param('id') id: number,
    @Body() body: UpdateInquilinoDto,
  ) {
    try {
      return await this.inquilinoService.update(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete('/:id')
  @Serialize(InquilinoDto)
  async deleteProprietario(@Param('id') id: number) {
    try {
      return await this.inquilinoService.delete(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/visita/:id')
  @Serialize(VisitaDto)
  async addVisita(@Param('id') id: number, @Body() body: CreateVisitaDto) {
    try {
      return await this.inquilinoService.registerVisita(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/proposta/:id')
  @Serialize(VisitaDto)
  async addProposta(@Param('id') id: number, @Body() body: CreatePropostaDto) {
    try {
      return await this.inquilinoService.registerProposta(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/contrato/:id')
  @Serialize(VisitaDto)
  async addContrato(@Param('id') id: number, @Body() body: CreateContratoDto) {
    try {
      return await this.inquilinoService.registerContrato(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/queries/clientes')
  async listClientesByProposta() {
    try {
      return await this.inquilinoService.listByPropostas();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/queries/imoveis')
  async listImoveis() {
    try {
      return await this.inquilinoService.listImoveis();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/queries/contratos')
  async listContratosFinalizados() {
    try {
      return await this.inquilinoService.listContratosFinalizados();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/queries/corretores')
  async listCorretores() {
    try {
      return await this.inquilinoService.listImovelByCorretor();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/queries/proprietarios')
  async listProprietarios() {
    try {
      return await this.inquilinoService.listProprietarios();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/queries/imoveis/caros')
  async listCaros() {
    try {
      return await this.inquilinoService.listImoveisCaros();
    } catch (e) {
      console.log(e);
    }
  }
}
