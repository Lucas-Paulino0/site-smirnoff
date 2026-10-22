import { useAlert } from "./useAlert";
import { Alert, Snackbar } from "@mui/material";

export const AlertCard = () => {
  const { alert, closeAlert } = useAlert();

  return (
    <Snackbar
      open={alert !== null}
      autoHideDuration={4000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={closeAlert}
        severity={alert?.type}
        variant="outlined"
        sx={{ width: "100%", background: "var(--surface)" }}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};
