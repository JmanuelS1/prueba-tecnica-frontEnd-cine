import { createStore, combineReducers } from "redux";
import { genreReducer } from "./genres/reducer";
import { searchMovieReducer } from "./searchMovie/reducer";


const rootReducer = combineReducers({
  genre: genreReducer,
  search: searchMovieReducer,
});

const store = createStore(rootReducer);
    
export default store;
