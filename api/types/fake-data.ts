import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';

export function fakeToken() {
  return {
    updatedAt: undefined,
    token: faker.lorem.words(5),
  };
}
export function fakeTokenComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    createdAt: new Date(),
    updatedAt: undefined,
    token: faker.lorem.words(5),
    userId: faker.number.int(),
  };
}
export function fakeUser() {
  return {
    updatedAt: undefined,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    createdAt: new Date(),
    updatedAt: undefined,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    role: Role.USER,
  };
}
export function fakeProprietario() {
  return {
    cpf: faker.lorem.words(5),
    nome: faker.lorem.words(5),
    estadoCivil: faker.lorem.words(5),
  };
}
export function fakeProprietarioComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    cpf: faker.lorem.words(5),
    nome: faker.lorem.words(5),
    estadoCivil: faker.lorem.words(5),
  };
}
export function fakeTelefone() {
  return {
    numero: faker.lorem.words(5),
  };
}
export function fakeTelefoneComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    numero: faker.lorem.words(5),
    proprietarioId: faker.number.int(),
  };
}
export function fakeCertidao() {
  return {
    numero: faker.lorem.words(5),
    dataReg: faker.date.anytime(),
    imovelId: undefined,
  };
}
export function fakeCertidaoComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    numero: faker.lorem.words(5),
    dataReg: faker.date.anytime(),
    proprietarioId: faker.number.int(),
    imovelId: undefined,
  };
}
export function fakeInquilino() {
  return {
    cpf: faker.lorem.words(5),
    nome: faker.lorem.words(5),
    profissao: faker.lorem.words(5),
    renda: faker.number.float(),
  };
}
export function fakeInquilinoComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    cpf: faker.lorem.words(5),
    nome: faker.lorem.words(5),
    profissao: faker.lorem.words(5),
    renda: faker.number.float(),
  };
}
export function fakeFiador() {
  return {
    cpf: faker.lorem.words(5),
    nome: faker.lorem.words(5),
    renda: faker.number.float(),
  };
}
export function fakeFiadorComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    cpf: faker.lorem.words(5),
    nome: faker.lorem.words(5),
    renda: faker.number.float(),
  };
}
export function fakeCorretor() {
  return {
    cpf: faker.lorem.words(5),
    nome: faker.lorem.words(5),
    creci: faker.lorem.words(5),
    comissao: faker.number.float(),
  };
}
export function fakeCorretorComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    cpf: faker.lorem.words(5),
    nome: faker.lorem.words(5),
    creci: faker.lorem.words(5),
    inicio: new Date(),
    comissao: faker.number.float(),
  };
}
export function fakeImovel() {
  return {
    endereco: faker.lorem.words(5),
    numComodos: faker.number.int({ max: 12 }),
    vagas: faker.number.int({ max: 12 }),
    area: faker.number.int({ max: 36 }),
    aluguel: faker.number.float(),
  };
}
export function fakeImovelComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    endereco: faker.lorem.words(5),
    numComodos: faker.number.int(),
    vagas: faker.number.int(),
    area: faker.number.int(),
    dataCad: new Date(),
    aluguel: faker.number.float(),
    proprietarioId: undefined,
    corretorId: undefined,
    certidaoId: undefined,
  };
}
export function fakeVisita() {
  return {
    dataVisita: faker.date.anytime(),
  };
}
export function fakeVisitaComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    dataVisita: faker.date.anytime(),
    inquilinoId: faker.number.int(),
    imovelId: faker.number.int(),
  };
}
export function fakeProposta() {
  return {
    valor: faker.number.float(),
  };
}
export function fakePropostaComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    dataProposta: new Date(),
    valor: faker.number.float(),
    inquilinoId: faker.number.int(),
    imovelId: faker.number.int(),
  };
}
export function fakeContratoComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    ativo: true,
    inquilinoId: faker.number.int(),
    imovelId: faker.number.int(),
  };
}
