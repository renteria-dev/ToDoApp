import { createContext, useContext, useState } from "react";
import Todo from "../interfaces/Todo";

type DialogContextProviderProps = {
  children: React.ReactNode;
};

type DialogContextType = {
  selectedItem: Todo | null;
  openEdit: boolean;
  openRemove: boolean;
  setSelectedItem: (item: Todo | null) => void;
  setOpenEdit: (open: boolean) => void;
  setOpenRemove: (open: boolean) => void;
};


export const DialogContext = createContext({} as DialogContextType);

export const useDialog = () => {
  const context = useContext(DialogContext);
  return context;
};

export const DialogContextProvider = ({ children }: DialogContextProviderProps) => {
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  
  return (
    <DialogContext.Provider
      value={{
        
        selectedItem,
        openEdit,
        openRemove,
        setSelectedItem,
        setOpenEdit,
        setOpenRemove,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};