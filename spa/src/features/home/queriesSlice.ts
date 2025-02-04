import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listClientesApi } from "../../api/queries/listClientes";
import { listContratosApi } from "../../api/queries/listContratos";
import { listCorretoresApi } from "../../api/queries/listCorretores";
import { listImoveisApi } from "../../api/queries/listImoveis";
import { listImoveisCarosApi } from "../../api/queries/listImoveisCaros";
import { listProprietariosApi } from "../../api/queries/listProprietarios";
import { RootState } from "../../app/store";

export interface Clientes {
  nome: string;
  dataProposta: Date;
  valor: number;
  Imovel: string;
}

export interface Imoveis {
  dono: string;
  endereco: string;
  comodos: number;
  vagas: number;
  aluguel: number;
}

export interface Contratos {
  inquilino: string;
  endereco: string;
}

export interface Corretores {
  endereco: string;
  nome: string;
  creci: string;
  aluguel: number;
  comissao: number;
}

export interface Proprietarios {
  nome: string;
  cpf: string;
  imoveis: number;
}

interface IInitial {
  clientes: Clientes[];
  imoveis: Imoveis[];
  contratos: Contratos[];
  corretores: Corretores[];
  imoveisCaros: Imoveis[];
  proprietarios: Proprietarios[];
  status: string;
}

const initialState: IInitial = {
  clientes: [],
  imoveis: [],
  contratos: [],
  corretores: [],
  imoveisCaros: [],
  proprietarios: [],
  status: "idle",
};

export const listClientes = createAsyncThunk(
  "queries/listClientes",
  async () => {
    const res = await listClientesApi();
    return res.data;
  }
);

export const listImoveis = createAsyncThunk("queries/listImoveis", async () => {
  const res = await listImoveisApi();
  return res.data;
});

export const listContratos = createAsyncThunk(
  "queries/listContratos",
  async () => {
    const res = await listContratosApi();
    return res.data;
  }
);

export const listCorretores = createAsyncThunk(
  "queries/listCorretores",
  async () => {
    const res = await listCorretoresApi();
    return res.data;
  }
);

export const listImoveisCaros = createAsyncThunk(
  "queries/listImoveisCaros",
  async () => {
    const res = await listImoveisCarosApi();
    return res.data;
  }
);

export const listProprietarios = createAsyncThunk(
  "queries/listProprietarios",
  async () => {
    const res = await listProprietariosApi();
    return res.data;
  }
);

export const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listClientes.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(listClientes.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listClientes.fulfilled, (state, { payload }: any) => {
        state.status = "idle";
        console.log(payload[0]);
        state.clientes = payload;
      });

    builder
      .addCase(listImoveis.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(listImoveis.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listImoveis.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        state.imoveis = payload;
      });

    builder
      .addCase(listContratos.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(listContratos.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listContratos.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        state.contratos = payload;
      });

    builder
      .addCase(listCorretores.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(listCorretores.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listCorretores.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        state.corretores = payload;
      });

    builder
      .addCase(listImoveisCaros.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(listImoveisCaros.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listImoveisCaros.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        state.imoveisCaros = payload;
      });

    builder
      .addCase(listProprietarios.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(listProprietarios.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listProprietarios.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        state.proprietarios = payload;
      });
  },
});

export const selectClientesPropostas = (state: RootState) =>
  state.queries.clientes;
export const selectContratosFinalizados = (state: RootState) =>
  state.queries.contratos;
export const selectCorretores = (state: RootState) => state.queries.corretores;
export const selectImoveis = (state: RootState) => state.queries.imoveis;
export const selectImoveisCaros = (state: RootState) =>
  state.queries.imoveisCaros;
export const selectProprietarios = (state: RootState) =>
  state.queries.proprietarios;

export default queriesSlice.reducer;
