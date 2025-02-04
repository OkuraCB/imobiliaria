import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogProps } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listImoveis, selectImoveis } from "./queriesSlice";

export const ImoveisDialog = ({ onClose, open }: DialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = useAppSelector(selectImoveis);

  const handleClose = () => {
    onClose(true);
    navigate(location.pathname);
  };

  useEffect(() => {
    dispatch(listImoveis());
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
    initialState: {
      density: "compact",
      grouping: ["dono"],
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle>Todos os Imóveis</DialogTitle>
      <DialogContent>
        <MaterialReactTable table={table} />
      </DialogContent>
    </Dialog>
  );
};
