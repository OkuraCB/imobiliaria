import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateContratoDto } from './dto/body/createContrato.dto';
import { CreateInquilinoDto } from './dto/body/createInquilino.dto';
import { CreatePropostaDto } from './dto/body/createProposta.dto';
import { CreateVisitaDto } from './dto/body/createVisita.dto';
import { UpdateInquilinoDto } from './dto/body/updateInquilino.dto';

@Injectable()
export class InquilinosService {
  constructor(private prisma: PrismaService) {}

  async list() {
    const inquilinos = await this.prisma.inquilino.findMany({
      include: { visitas: true, propostas: true, contratos: true },
    });

    if (!inquilinos) return [];

    return inquilinos;
  }

  async create(body: CreateInquilinoDto) {
    const newInquilino = await this.prisma.inquilino.create({
      data: body,
    });

    if (!newInquilino) throw new Error('erro');

    return newInquilino;
  }

  async update(id: number, body: UpdateInquilinoDto) {
    const updatedInquilino = await this.prisma.inquilino.update({
      where: { id },
      data: body,
    });

    if (!updatedInquilino) throw new Error('erro');

    return updatedInquilino;
  }

  async delete(id: number) {
    const deleted = await this.prisma.inquilino.delete({ where: { id } });

    if (!deleted) throw new Error('erro');

    return deleted;
  }

  async registerVisita(id: number, body: CreateVisitaDto) {
    const { imovelId, ...data } = body;

    const newVisita = await this.prisma.visita.create({
      data: {
        dataVisita: data.dataVisita,
        inquilino: { connect: { id } },
        imovel: { connect: { id: imovelId } },
      },
    });

    if (!newVisita) throw new Error('erro');

    return newVisita;
  }

  async registerProposta(id: number, body: CreatePropostaDto) {
    const { imovelId, ...data } = body;

    const newProposta = await this.prisma.proposta.create({
      data: {
        ...data,
        inquilino: { connect: { id } },
        imovel: { connect: { id: imovelId } },
      },
    });

    if (!newProposta) throw new Error('erro');

    return newProposta;
  }

  async registerContrato(id: number, body: CreateContratoDto) {
    const { imovelId } = body;

    const newContrato = await this.prisma.contrato.create({
      data: {
        inquilino: { connect: { id } },
        imovel: { connect: { id: imovelId } },
      },
    });

    if (!newContrato) throw new Error('erro');

    return newContrato;
  }
}
