"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import { ApiRequest } from "@prisma/client";
import { useTheme } from "next-themes";
import { FC } from "react";

const columnsDraft: GridColDef[] = [
  {
    field: "apiKey",
    headerName: "API key used",
    width: 400,
  },
  {
    field: "path",
    headerName: "Path",
    width: 250,
  },

  {
    field: "recency",
    headerName: "Recency",
    width: 250,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

const columns = columnsDraft.map(col => ({
  ...col,
  renderHeader(params: GridColumnHeaderParams) {
    return (
      <strong className="font-semibold">{params.colDef.headerName}</strong>
    );
  },
}));

interface ModifiedApiRequest extends Omit<ApiRequest, "timestamp"> {
  timestamp: string;
}

interface TableProps {
  userRequests: ModifiedApiRequest[];
}

const Table: FC<TableProps> = ({ userRequests }) => {
  const { theme: applicationTheme } = useTheme();
  const theme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  const rows = userRequests.map(request => ({
    id: request.id,
    apiKey: request.usedApiKey,
    path: request.path,
    recency: `${request.timestamp} ago`,
    duration: `${request.duration} ms`,
    status: request.status,
  }));

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        style={{
          fontSize: "1rem",
          backgroundColor: applicationTheme === "light" ? "white" : "#152238",
        }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        autoHeight
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            },
          },
        }}
      />
    </ThemeProvider>
  );
};

export default Table;
