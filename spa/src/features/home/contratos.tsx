import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogProps } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listContratos, selectContratosFinalizados } from "./queriesSlice";

export const ContratosDialog = ({ onClose, open }: DialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = useAppSelector(selectContratosFinalizados);

  const handleClose = () => {
    onClose(true);
    navigate(location.pathname);
  };

  useEffect(() => {
    dispatch(listContratos());
  }, []);

  const columns = useMemo(
    () => [
      { header: "Inquilino", accessorKey: "inquilino" },
      {
        header: "Imovel",
        accessorKey: "endereco",
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
      <DialogTitle>Contratos Finalizados</DialogTitle>
      <DialogContent>
        <MaterialReactTable table={table} />
      </DialogContent>
    </Dialog>
  );
};
