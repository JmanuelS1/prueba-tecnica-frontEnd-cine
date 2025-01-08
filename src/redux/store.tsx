/**
 * Importaciones necesarias para la configuración del store
 */
import { createStore, combineReducers } from "redux";
import { genreReducer } from "./genres/reducer";
import { searchMovieReducer } from "./searchMovie/reducer";

/**
 * Combinación de todos los reducers de la aplicación
 *
 * @constant rootReducer
 * @description
 * Combina los reducers:
 * - genreReducer: Maneja el estado de géneros de películas
 * - searchMovieReducer: Maneja el estado de búsqueda de películas
 *
 * @type {ReturnType<typeof combineReducers>}
 */
const rootReducer = combineReducers({
  genre: genreReducer,
  search: searchMovieReducer,
});

/**
 * Store principal de Redux
 *
 * @constant store
 * @description
 * Configura el store global de la aplicación con los reducers combinados.
 *
 * Estructura del estado global:
 * {
 *   genre: {
 *     genre: string | null
 *   },
 *   search: {
 *     search: Movie[]
 *   }
 * }
 *
 * @example
 * // Acceder al estado
 * const genre = store.getState().genre;
 * const searchResults = store.getState().search;
 *
 * // Despachar acciones
 * store.dispatch({ type: "SET_GENRE", payload: { id: 1, name: "Action" } });
 * store.dispatch({ type: "SET_SEARCH", payload: [] });
 */
const store = createStore(rootReducer);

export default store;
