import { HomeState, Action } from "@/types/context";
// Initial state for the reducer
const initialState: HomeState = {
  dialogExists: false,
  chatOpen: false,
  messages: [], // getInitialMessages(),
  currentPage: 1,
  isModalOpen: false,
  modalType: {
    type: "",
    id: ""
  },
  notification: {isOpen:false, message: "no message"},
  file: null
};

// The reducer function
const homeReducer = (state: HomeState, action: Action): HomeState => {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      return {
        ...state,
        chatOpen: !state.chatOpen,
      };
    case 'UPDATE_MESSAGES':
      // TypeScript now correctly infers that action has a 'payload' of type 'Message'
      const updatedMessages = [...state.messages, action.payload];
      return {
        ...state,
        messages: updatedMessages,
      };
    case 'CHOOSE_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        modalType: action.payload
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false
      }
    case 'OPEN_NOTIFICATION':
      return {
        ...state,
         notification: {
          isOpen: true,
          message: action.payload
         }
      }
    case 'CLOSE_NOTIFICATION':
      return {
        ...state,
         notification: {
          isOpen: false,
          message: ""
         }
      }
    case 'SET_FILE':
      return {
        ...state,
        file: action.payload
      }
    case "RESET_FILE":
      return {
        ...state,
        file: null
      }
    default:
      return state;
  }
};

export { initialState, homeReducer };