import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ProductListSkeleton() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "600px",
        backgroundColor: "var(--background-secondary)",
        border: "1px solid rgb(41, 53, 75)",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Skeleton variant="text" width="100%" height={40} />
      <TableContainer>
        <Table sx={{ marginTop: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton variant="text" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(5)).map((_, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
