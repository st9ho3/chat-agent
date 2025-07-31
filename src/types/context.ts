import { MessageType } from "@/shemas/chat";
import { initialState } from "@/app/context/homeContext/homeReducer";
import { ReactNode } from "react";

export interface HomeContextProps {
    state: typeof initialState,
    dispatch: React.Dispatch<Action>;
}

interface Notification {
  isOpen: boolean,
  message: string
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
  | { type: "OPEN_NOTIFICATION"; payload: string}
  | { type: "CLOSE_NOTIFICATION"} 
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

export enum IngredientEditAction {
  Delete = "delete",
  Add = "add",
  NoAction = "no action"
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
  ingredients: Ingredient[];
  action: string; // Or a specific literal type like 'add' | 'delete' | 'update'
}