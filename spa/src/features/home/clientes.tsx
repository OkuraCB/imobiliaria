import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogProps } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listClientes, selectClientesPropostas } from "./queriesSlice";

export const ClientesDialog = ({ onClose, open }: DialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = useAppSelector(selectClientesPropostas);

  const handleClose = () => {
    onClose(true);
    navigate(location.pathname);
  };

  useEffect(() => {
    dispatch(listClientes());
  }, []);

  const columns = useMemo(
    () => [
      { header: "Nome", accessorKey: "nome" },
      {
        header: "Data",
        accessorKey: "dataProposta",
      },
      {
        header: "Valor",
        accessorFn: ({ valor }: { valor: number }) => `R$ ${valor * 10}`,
      },
      {
        header: "Imovel",
        accessorKey: "imovel",
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
      <DialogTitle>Clientes com mais propostas</DialogTitle>
      <DialogContent>
        <MaterialReactTable table={table} />
      </DialogContent>
    </Dialog>
  );
};
