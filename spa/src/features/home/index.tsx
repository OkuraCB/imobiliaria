import { Button, Grid } from "@mui/material";
import { Pace, WindupChildren } from "windups";

export const Home = () => {
  return (
    <Grid container spacing={2} padding={4} flexDirection="row">
      <Grid
        container
        item
        xs={6}
        flexDirection="column"
        justifyContent="center"
      >
        <Grid item>
          <WindupChildren>
            <Pace getPace={() => 60}>
              <span style={{ fontSize: 60 }}>Template</span>
            </Pace>
          </WindupChildren>
        </Grid>
        <Grid item>
          <span>SPA Template</span>{" "}
        </Grid>
        <Grid
          container
          item
          flexDirection="row"
          justifyContent="space-evenly"
          paddingTop={5}
        >
          <Grid item>
            <Button variant="contained" color="primary">
              Botão (?)
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={6} flexDirection="column" alignContent="center">
        <Grid item>Imagem show</Grid>
      </Grid>
    </Grid>
  );
};
