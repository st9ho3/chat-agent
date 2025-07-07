import { Message } from "@/shemas/chat";
interface HomeContextProps {
    state: typeof initialState,
    dispatch: React.Dispatch<Action>;
}

interface HomeState {
  dialogExists: boolean;
  chatOpen: boolean;
  messages: Message[];
  currentPage: number;
  isModalOpen: boolean;
}

// Discriminated union for actions for better type safety
type Action =
  | { type: "TOGGLE_CHAT" }
  | { type: "UPDATE_MESSAGES"; payload: Message }
  | { type: "CHOOSE_PAGE"; payload: number }
  | { type: "OPEN_MODAL"}
  | { type: "CLOSE_MODAL"}

  interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ButtonProps {
  text: React.ReactNode;
  action: () => void;
}