import Swal from "sweetalert2";
import "./alerts.css";

export const sweetAlertsSuccessfully = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: "OK",
  });
};
export const sweetAlertsError = (title, text, textButton) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: textButton,
  });
};
export const sweetAlertsWarning = (title, text) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: "OK",
    showCancelButton: true,
    cancelButtonText: "CANCEL",
  });
};
export const sweetAlertsMessage = (title, text, textButton) => {
  Swal.fire({
    icon: "info",
    title: title,
    text: text,
    showConfirmButton: textButton,
  });
};
