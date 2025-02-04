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

  async listByPropostas() {
    const propostas = await this.prisma.proposta.findMany({
      select: {
        dataProposta: true,
        valor: true,
        inquilino: { select: { nome: true } },
        imovel: { select: { endereco: true } },
      },
    });

    const formated = propostas.map((proposta) => {
      return {
        dataProposta: proposta.dataProposta,
        valor: proposta.valor,
        nome: proposta.inquilino.nome,
        imovel: proposta.imovel.endereco,
      };
    });

    return formated;
  }

  async listImoveis() {
    const imoveis = await this.prisma.imovel.findMany({
      include: { proprietario: true },
    });

    const formated = imoveis.map((imovel) => {
      return {
        dono: imovel.proprietario.nome,
        endereco: imovel.endereco,
        comodos: imovel.numComodos,
        vagas: imovel.vagas,
        aluguel: imovel.vagas,
      };
    });

    return formated;
  }

  async listContratosFinalizados() {
    const contratosFinalizados = await this.prisma.contrato.findMany({
      where: { ativo: false },
      include: { inquilino: true, imovel: true },
    });

    const formated = contratosFinalizados.map((contrato) => {
      return {
        inquilino: contrato.inquilino.nome,
        endereco: contrato.imovel.endereco,
      };
    });

    return formated;
  }

  async listImovelByCorretor() {
    const imoveis = await this.prisma.imovel.findMany({
      include: { corretor: true, contratos: { select: { ativo: true } } },
    });

    const formated = imoveis.map((imovel) => {
      const hasContrato = imovel.contratos.find(
        (value) => value.ativo === true,
      );

      if (hasContrato) {
        return {
          endereco: imovel.endereco,
          nome: imovel.corretor.nome,
          creci: imovel.corretor.creci,
          aluguel: imovel.aluguel,
          comissao: imovel.corretor.comissao,
        };
      }
    });

    const formatest = formated.filter((item) => item != undefined);
    return formatest;
  }

  async listProprietarios() {
    const proprietarios = await this.prisma.proprietario.findMany({
      include: { imoveis: true },
    });

    const formated = proprietarios
      .map((proprietario) => {
        const count = proprietario.imoveis.length;
        return {
          nome: proprietario.nome,
          cpf: proprietario.cpf,
          imoveis: count,
        };
      })
      .sort((a, b) => b.imoveis - a.imoveis);

    return formated;
  }

  async listImoveisCaros() {
    const imoveis = (
      await this.prisma.imovel.findMany({
        orderBy: { aluguel: 'desc' },
        include: { proprietario: true },
      })
    ).slice(0, 3);

    const formated = imoveis.map((imovel) => {
      return {
        dono: imovel.proprietario.nome,
        endereco: imovel.endereco,
        comodos: imovel.numComodos,
        vagas: imovel.vagas,
        aluguel: imovel.aluguel,
      };
    });

    return formated;
  }
}
