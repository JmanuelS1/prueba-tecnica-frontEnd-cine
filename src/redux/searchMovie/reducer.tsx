const initialState = {
  search: [],
};
export const searchMovieReducer = (state = initialState, action: any) => {
   switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
   }
}
