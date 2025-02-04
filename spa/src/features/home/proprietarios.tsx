import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogProps } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listProprietarios, selectProprietarios } from "./queriesSlice";

export const ProprietariosDialog = ({ onClose, open }: DialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = useAppSelector(selectProprietarios);

  const handleClose = () => {
    onClose(true);
    navigate(location.pathname);
  };

  useEffect(() => {
    dispatch(listProprietarios());
  }, []);

  const columns = useMemo(
    () => [
      { header: "Nome", accessorKey: "nome" },
      { header: "CPF", accessorKey: "cpf" },
      {
        header: "N° de Imoveis",
        accessorKey: "imoveis",
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
      <DialogTitle>Proprietários com mais imóveis</DialogTitle>
      <DialogContent>
        <MaterialReactTable table={table} />
      </DialogContent>
    </Dialog>
  );
};
