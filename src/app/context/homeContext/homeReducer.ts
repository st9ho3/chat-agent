interface HomeState {
  dialogExists: boolean;
}

const initialState: HomeState = {
  dialogExists: false
};

const homeReducer = (state: typeof initialState, action: { type: string }) => {
  switch (action.type) {
    case "TOGGLE_DIALOG":
      return {
        ...state,
        dialogExists: true
      };
    default:
      return state;
  }
};

export { initialState, homeReducer };