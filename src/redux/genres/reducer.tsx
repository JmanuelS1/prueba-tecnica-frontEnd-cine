/**
 * Estado inicial del reducer de géneros
 * 
 * @constant
 * @type {Object}
 * @property {string} genre - Género seleccionado, por defecto "All Genres"
 */
const initialState = {
  genre: "All Genres",
};

/**
 * Reducer para manejar el estado de géneros de películas
 * 
 * @function genreReducer
 * @description
 * Maneja las acciones relacionadas con la selección de géneros de películas.
 * Actualmente soporta:
 * - SET_GENRE: Actualiza el género seleccionado
 * 
 * @param {Object} state - Estado actual, por defecto initialState
 * @param {Object} action - Acción a ejecutar
 * @param {string} action.type - Tipo de acción
 * @param {any} action.payload - Datos de la acción
 * 
 * @returns {Object} Nuevo estado
 * 
 * @example
 * // Para establecer un nuevo género
 * dispatch({ 
 *   type: "SET_GENRE", 
 *   payload: { id: 28, name: "Action" } 
 * });
 */
export const genreReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_GENRE":
      return { ...state, genre: action.payload };
    default:
      return state;
  }
};