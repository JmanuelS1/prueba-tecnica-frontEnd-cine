/**
 * Estado inicial del reducer de búsqueda
 *
 * @constant
 * @type {Object}
 * @property {Array} search - Array vacío que contendrá los resultados de búsqueda
 */
const initialState = {
  search: [],
};

/**
 * Reducer para manejar el estado de búsqueda de películas
 *
 * @function searchMovieReducer
 * @description
 * Maneja las acciones relacionadas con la búsqueda de películas.
 * Actualmente soporta:
 * - SET_SEARCH: Actualiza los resultados de búsqueda
 *
 * @param {Object} state - Estado actual, por defecto initialState
 * @param {Object} action - Acción a ejecutar
 * @param {string} action.type - Tipo de acción
 * @param {Array} action.payload - Resultados de la búsqueda
 *
 * @returns {Object} Nuevo estado con los resultados de búsqueda actualizados
 *
 * @example
 * // Para establecer nuevos resultados de búsqueda
 * dispatch({
 *   type: "SET_SEARCH",
 *   payload: [
 *     { id: 1, title: "Movie 1" },
 *     { id: 2, title: "Movie 2" }
 *   ]
 * });
 *
 * // Para limpiar los resultados
 * dispatch({
 *   type: "SET_SEARCH",
 *   payload: []
 * });
 */
export const searchMovieReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
  }
};
