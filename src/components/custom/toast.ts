import { toast } from "react-hot-toast";

export function successToast(message: string) {
  toast.success(message, {
    style: {
      padding: "16px 20px",
      borderRadius: "4px",
      background: "#ffffff",
      color: "#22c55e", // Tailwind green-500
      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#ffffff",
    },
    duration: 4000,
  });
}

export function errorToast(message: string) {
  toast.error(message, {
    style: {
      padding: "16px 20px",
      borderRadius: "12px",
      background: "#ffffff",
      color: "#ef4444", // Tailwind red-500
      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#ffffff",
    },
    duration: 4000,
  });
}