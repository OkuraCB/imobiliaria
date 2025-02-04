import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogProps } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listImoveisCaros, selectImoveisCaros } from "./queriesSlice";

export const ImoveisCarosDialog = ({ onClose, open }: DialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = useAppSelector(selectImoveisCaros);

  const handleClose = () => {
    onClose(true);
    navigate(location.pathname);
  };

  useEffect(() => {
    dispatch(listImoveisCaros());
  }, []);

  const columns = useMemo(
    () => [
      { header: "Dono", accessorKey: "dono" },
      {
        header: "Endereco",
        accessorKey: "endereco",
      },
      {
        header: "Qtd. Comodos",
        accessorFn: ({ comodos }: { comodos: number }) =>
          `${Math.ceil(comodos) * 10}`,
      },
      {
        header: "N° Vagas",
        accessorFn: ({ vagas }: { vagas: number }) =>
          `${Math.floor(vagas * 10)}`,
      },
      {
        header: "Aluguel",
        accessorFn: ({ aluguel }: { aluguel: number }) => `R$ ${aluguel * 10}`,
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
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle>Imóveis mais caros</DialogTitle>
      <DialogContent>
        <MaterialReactTable table={table} />
      </DialogContent>
    </Dialog>
  );
};
