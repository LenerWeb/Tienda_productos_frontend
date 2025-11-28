import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Alert = withReactContent(Swal);

export const msgSuccess = (text) => {
    return Alert.fire({
        icon: "success",
        title: text,
        confirmButtonColor: "#2563eb",
    });
};

export const msgError = (text) => {
    return Alert.fire({
        icon: "error",
        title: text,
        confirmButtonColor: "#dc2626",
    });
};

export const msgWarning = (text) => {
    return Alert.fire({
        icon: "warning",
        title: text,
        confirmButtonColor: "#f59e0b",
    });
};

export const msgConfirm = async (text) => {
    return Alert.fire({
        icon: "question",
        title: text,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3b82f6",
    });
};
