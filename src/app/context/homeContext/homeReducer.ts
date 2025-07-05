import { getInitialMessages } from '../../services/helpers';

// Initial state for the reducer
const initialState: HomeState = {
  dialogExists: false,
  chatOpen: false,
  messages: [], // getInitialMessages(),
  currentPage: 1,
  isModalOpen: false
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
        isModalOpen: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false
      }
    default:
      return state;
  }
};

export { initialState, homeReducer };