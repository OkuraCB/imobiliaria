import { Injectable } from '@nestjs/common';
import { getRandomInt } from 'src/common/random';
import { PrismaService } from 'src/prisma.service';
import {
  fakeCertidao,
  fakeCorretor,
  fakeImovel,
  fakeInquilino,
  fakeProposta,
  fakeProprietario,
  fakeTelefone,
  fakeVisita,
} from 'types/fake-data';
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

  async assignCorretor(id: number, body: AssignCorretorDto) {
    const assignedImovel = await this.prisma.imovel.update({
      where: { id },
      data: { corretor: { connect: { id: body.corretorId } } },
    });

    if (!assignedImovel) throw new Error('erro');

    return assignedImovel;
  }

  async generateData() {
    //generate proprietarios
    const proprietarios = [];
    for (let i = 0; i < 100; i++) {
      proprietarios.push(
        await this.prisma.proprietario.create({
          data: {
            ...fakeProprietario(),
            telefones: {
              create: fakeTelefone(),
            },
          },
        }),
      );
    }

    //generate imoveis
    const imoveis = [];
    for (let i = 0; i < 1000; i++) {
      imoveis.push(
        await this.prisma.imovel.create({ data: { ...fakeImovel() } }),
      );
    }

    //generate corretor
    const corretores = [];
    for (let i = 0; i < 50; i++) {
      corretores.push(
        await this.prisma.corretor.create({ data: { ...fakeCorretor() } }),
      );
    }

    //connect imoveis
    for (let i = 0; i < 1000; i++) {
      const proprietarioIdx = getRandomInt(100);
      const proprietario = proprietarios[proprietarioIdx];

      const corretorIdx = getRandomInt(50);
      const corretor = corretores[corretorIdx];

      if (getRandomInt(2) === 0) {
        await this.prisma.certidao.create({
          data: {
            ...fakeCertidao(),
            proprietario: { connect: { id: proprietario.id } },
            imovel: { connect: { id: imoveis[i].id } },
          },
        });
      }

      await this.prisma.imovel.update({
        where: { id: imoveis[i].id },
        data: {
          proprietario: { connect: { id: proprietario.id } },
          corretor: { connect: { id: corretor.id } },
        },
      });
    }

    //generate inquilinos
    const inquilinos = [];
    for (let i = 0; i < 100; i++) {
      inquilinos.push(
        await this.prisma.inquilino.create({ data: { ...fakeInquilino() } }),
      );
    }

    //generate visitas
    const visitasCount = getRandomInt(1000);
    for (let i = 0; i < visitasCount; i++) {
      const inquilinoIdx = getRandomInt(100);
      const inquilino = inquilinos[inquilinoIdx];

      const imovelIdx = getRandomInt(1000);
      const imovel = imoveis[imovelIdx];

      await this.prisma.visita.create({
        data: {
          ...fakeVisita(),
          inquilino: { connect: { id: inquilino.id } },
          imovel: { connect: { id: imovel.id } },
        },
      });
    }

    //generate proposta
    const propostaCount = getRandomInt(1000);
    for (let i = 0; i < propostaCount; i++) {
      const inquilinoIdx = getRandomInt(100);
      const inquilino = inquilinos[inquilinoIdx];

      const imovelIdx = getRandomInt(1000);
      const imovel = imoveis[imovelIdx];

      await this.prisma.proposta.create({
        data: {
          ...fakeProposta(),
          inquilino: { connect: { id: inquilino.id } },
          imovel: { connect: { id: imovel.id } },
        },
      });
    }

    //generate contrato
    let morados = 0;
    for (let i = 0; i < 500; i++) {
      const inquilinoIdx = getRandomInt(100 - morados);
      const imovelIdx = getRandomInt(1000 - i);

      const imovel = imoveis[imovelIdx];
      imoveis.filter((im) => im != imovel);

      const inquilino = inquilinos[inquilinoIdx];
      if (getRandomInt(2) === 0) {
        inquilinos.filter((inq) => inq != inquilino);
        morados += 1;
        await this.prisma.contrato.create({
          data: {
            inquilino: { connect: { id: inquilino.id } },
            imovel: { connect: { id: imovel.id } },
          },
        });
      } else {
        await this.prisma.contrato.create({
          data: {
            ativo: false,
            inquilino: { connect: { id: inquilino.id } },
            imovel: { connect: { id: imovel.id } },
          },
        });
      }
    }

    return 'finished';
  }
}
