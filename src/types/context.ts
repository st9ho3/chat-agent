import { MessageType } from "@/shemas/chat";
import { initialState } from "@/app/context/homeContext/homeReducer";
import { ReactNode } from "react";
import { RecipeIngredients } from "@/shemas/recipe";

export interface HomeContextProps {
    state: typeof initialState,
    dispatch: React.Dispatch<Action>;
}

export enum NotificationType {
  Success = 'success',
  Failure = 'failure',
  Info = 'info'
}

interface Notification {
  isOpen: boolean,
  message: string,
  notificationType: NotificationType
}

export interface ModalType {
  type: string
} 

export interface HomeState {
  dialogExists: boolean;
  chatOpen: boolean;
  messages: MessageType[];
  currentPage: number;
  isModalOpen: boolean;
  isProfileOpen: boolean;
  modalType: ModalType;
  notification: Notification,
  file: File | null
}

// Discriminated union for actions for better type safety
 export type Action =
  | { type: "TOGGLE_CHAT" }
  | { type: "UPDATE_MESSAGES"; payload: MessageType }
  | { type: "CHOOSE_PAGE"; payload: number }
  | { type: "OPEN_MODAL"; payload: ModalType}
  | { type: "CLOSE_MODAL";}
  | { type: "OPEN_PROFILE"; }
  | { type: "CLOSE_PROFILE" }
  | { type: "HANDLE_NOTIFICATION";  payload: Notification}
  | { type: "SET_FILE"; payload: File | null}
  | { type: "RESET_FILE"}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface ButtonProps {
  text: React.ReactNode;
  action: () => void;
}

export interface Ingredient {
  ingredientId: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  iconBgColor: string;
  recipeId: string;
}

export interface Recipe {
  id: string;
  title: string;
  totalCost: number;
  createdBy: string;
  dateCreated: Date; // Or Date if you parse it
  category: string;   // Or a specific literal type like 'starter'
}

export interface RecipeUpdatePayload {
  recipe: Recipe;
  addedIngredients?: RecipeIngredients[];
  removedIngredients?: RecipeIngredients[];
}