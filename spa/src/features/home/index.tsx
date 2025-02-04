import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { Pace, WindupChildren } from "windups";
import { useAppSelector } from "../../app/hooks";
import homepage from "../../assets/homepage.svg";
import { selectUser } from "../users/usersSlice";
import { ClientesDialog } from "./clientes";
import { ContratosDialog } from "./contratos";
import { CorretoresDialog } from "./corretores";
import { ImoveisDialog } from "./imoveis";
import { ImoveisCarosDialog } from "./imoveisCaros";
import { ProprietariosDialog } from "./proprietarios";

export interface DialogProps {
  onClose: any;
  open: boolean;
}

export const Home = () => {
  const user = useAppSelector(selectUser);

  const [clientes, setClientes] = useState<boolean>(false);
  const closeClientes = () => {
    setClientes(false);
  };

  const [imoveis, setImoveis] = useState<boolean>(false);
  const closeImoveis = () => {
    setImoveis(false);
  };

  const [imoveisCaros, setImoveisCaros] = useState<boolean>(false);
  const closeImoveisCaros = () => {
    setImoveisCaros(false);
  };

  const [contratos, setContratos] = useState<boolean>(false);
  const closeContratos = () => {
    setContratos(false);
  };

  const [corretores, setCorretores] = useState<boolean>(false);
  const closeCorretores = () => {
    setCorretores(false);
  };

  const [proprietarios, setProprietarios] = useState<boolean>(false);
  const closeProprietarios = () => {
    setProprietarios(false);
  };

  return (
    <>
      <Grid container spacing={2} flexDirection="row" minHeight="85vh">
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="center"
          justifyItems="center"
          xs={6}
        >
          <Grid item>
            <WindupChildren>
              <Pace getPace={() => 60}>
                <span style={{ fontSize: 60 }}>Olá, {user.name}!</span>
              </Pace>
            </WindupChildren>
          </Grid>
          <Grid item>
            <span>
              Utilizando esse aplicativo, você pode administrar todos os
              proprietários, inquilinos e imóveis de sua imobiliária!
            </span>
            <br />
            <br />
            <span>
              Confira abaixo as consultas de alguns dados comuns disponíveis
              para você.
            </span>
          </Grid>

          <Grid
            container
            item
            spacing={2}
            marginTop={2}
            flexDirection="row"
            justifyContent="center"
          >
            <Grid item>
              <Button variant="contained" onClick={() => setClientes(true)}>
                Clientes com propostas
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setImoveis(true)}
              >
                Todos os imóveis
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setContratos(true)}
              >
                Contratos encerrados
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => setCorretores(true)}>
                Corretores mais rentáveis
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => setImoveisCaros(true)}>
                Os 3 imóveis mais caros
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setProprietarios(true)}
              >
                Proprietários com mais imóveis
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="center"
          justifyItems="center"
          alignItems="center"
          xs={6}
        >
          <img src={homepage} width="60%" />
        </Grid>
      </Grid>

      <ClientesDialog open={clientes} onClose={closeClientes} />
      <ImoveisDialog open={imoveis} onClose={closeImoveis} />
      <ContratosDialog open={contratos} onClose={closeContratos} />
      <CorretoresDialog open={corretores} onClose={closeCorretores} />
      <ImoveisCarosDialog open={imoveisCaros} onClose={closeImoveisCaros} />
      <ProprietariosDialog open={proprietarios} onClose={closeProprietarios} />
    </>
  );
};
