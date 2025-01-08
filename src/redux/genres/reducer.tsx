const initialState = {
  genre: "All Genres",
};

export const genreReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_GENRE":
      return { ...state, genre: action.payload };
    default:
      return state;
  }
};
