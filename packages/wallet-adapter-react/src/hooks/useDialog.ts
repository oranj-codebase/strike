import { useContext } from "react";
import { Connect2ICContext } from "../context";

export const useDialog = () => {
  const { dialog } = useContext(Connect2ICContext);

  return dialog;
};
