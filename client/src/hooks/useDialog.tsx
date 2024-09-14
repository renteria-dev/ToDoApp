import { createContext, useContext, useState } from "react";
import Todo from "../interfaces/Todo";

type DialogContextProviderProps = {
  children: React.ReactNode;
};

type DialogContextType = {
  createdItem: Todo | null;
  selectedItem: Todo | null;
  openCreate: boolean;
  openEdit: boolean;
  openRemove: boolean;
  setCreatedItem: (item: Todo | null) => void;
  setSelectedItem: (item: Todo | null) => void;
  setOpenCreate: (open: boolean) => void;
  setOpenEdit: (open: boolean) => void;
  setOpenRemove: (open: boolean) => void;
};

export const DialogContext = createContext({} as DialogContextType);

export const useDialog = () => {
  const context = useContext(DialogContext);
  return context;
};

export const DialogContextProvider = ({
  children,
}: DialogContextProviderProps) => {
  const [createdItem, setCreatedItem] = useState<Todo | null>(null);
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  return (
    <DialogContext.Provider
      value={{
        createdItem,
        selectedItem,
        openCreate,
        openEdit,
        openRemove,
        setCreatedItem,
        setOpenCreate,
        setSelectedItem,
        setOpenEdit,
        setOpenRemove,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
