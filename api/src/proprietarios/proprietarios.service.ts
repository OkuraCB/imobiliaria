import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssignCorretorDto } from './dto/body/assignCorretor.dto';
import { CreateCertificateDto } from './dto/body/createCertificate.dto';
import { CreateCorretorDto } from './dto/body/createCorretor.dto';
import { CreateNumberDto } from './dto/body/createNumber.dto';
import { CreatePropertyDto } from './dto/body/createProperty.dto';
import { CreateProprietarioDto } from './dto/body/createProprietario.dto';
import { UpdateProprietarioDto } from './dto/body/updateProprietario.dto';

@Injectable()
export class ProprietariosService {
  constructor(private prisma: PrismaService) {}

  async list() {
    const proprietarios = await this.prisma.proprietario.findMany({
      include: { telefones: true, registros: true, imoveis: true },
    });

    if (!proprietarios) return [];

    return proprietarios;
  }

  async create(body: CreateProprietarioDto) {
    const newProprietario = await this.prisma.proprietario.create({
      data: body,
    });

    if (!newProprietario) throw new Error('erro');

    return newProprietario;
  }

  async createCorretor(body: CreateCorretorDto) {
    const newCorretor = await this.prisma.corretor.create({
      data: body,
    });

    if (!newCorretor) throw new Error('erro');

    return newCorretor;
  }

  async update(id: number, body: UpdateProprietarioDto) {
    const updatedProprietario = await this.prisma.proprietario.update({
      where: { id },
      data: body,
    });

    if (!updatedProprietario) throw new Error('erro');

    return updatedProprietario;
  }

  async delete(id: number) {
    const deleted = await this.prisma.proprietario.delete({ where: { id } });

    if (!deleted) throw new Error('erro');

    return deleted;
  }

  async registerNumber(id: number, body: CreateNumberDto) {
    const newNumber = await this.prisma.telefone.create({
      data: { numero: body.numero, proprietario: { connect: { id } } },
    });

    if (!newNumber) throw new Error('erro');

    return newNumber;
  }

  async registerCerticate(id: number, body: CreateCertificateDto) {
    const { imovelId, ...data } = body;

    const newCertificate = await this.prisma.certidao.create({
      data: {
        numero: body.numero,
        dataReg: body.dataReg,
        proprietario: { connect: { id } },
        imovel: { connect: { id: imovelId } },
      },
    });

    if (!newCertificate) throw new Error('erro');

    return newCertificate;
  }

  async registerProperty(id: number, body: CreatePropertyDto) {
    const newProperty = await this.prisma.imovel.create({
      data: {
        endereco: body.endereco,
        numComodos: body.numComodos,
        vagas: body.vagas,
        area: body.area,
        aluguel: body.aluguel,
        proprietario: { connect: { id } },
      },
    });

    if (!newProperty) throw new Error('erro');

    return newProperty;
  }

  async asignCorretor(id: number, body: AssignCorretorDto) {
    const assignedImovel = await this.prisma.imovel.update({
      where: { id },
      data: { corretor: { connect: { id: body.corretorId } } },
    });

    if (!assignedImovel) throw new Error('erro');

    return assignedImovel;
  }
}
