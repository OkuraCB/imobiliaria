import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogProps } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listCorretores, selectCorretores } from "./queriesSlice";

export const CorretoresDialog = ({ onClose, open }: DialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = useAppSelector(selectCorretores);

  const handleClose = () => {
    onClose(true);
    navigate(location.pathname);
  };

  useEffect(() => {
    dispatch(listCorretores());
  }, []);

  const columns = useMemo(
    () => [
      { header: "Nome", accessorKey: "nome" },
      { header: "CRECI", accessorKey: "creci" },
      {
        header: "Endereco",
        accessorKey: "endereco",
      },
      {
        header: "Lucrabilidade (% aluguel/comissao)",
        accessorFn: ({
          aluguel,
          comissao,
        }: {
          aluguel: number;
          comissao: number;
        }) => `% ${aluguel / comissao}`,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    defaultColumn: {
      muiTableHeadCellProps: { align: "center" },
      muiTableBodyCellProps: { align: "center" },
    },
    layoutMode: "semantic",
    initialState: {
      density: "compact",
      grouping: ["nome"],
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle>Corretores mais rentáveis</DialogTitle>
      <DialogContent>
        <MaterialReactTable table={table} />
      </DialogContent>
    </Dialog>
  );
};
