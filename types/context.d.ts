
interface HomeContextProps {
    state: typeof initialState,
    dispatch: React.Dispatch<Action>;
}

interface HomeState {
  dialogExists: boolean;
  chatOpen: boolean;
  messages: Message[];
}

// Discriminated union for actions for better type safety
type Action =
  | { type: "TOGGLE_DIALOG" }
  | { type: "TOGGLE_CHAT" }
  | { type: "UPDATE_MESSAGES"; payload: Message };
