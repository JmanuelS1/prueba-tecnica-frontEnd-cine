/**
 * Interface que define la estructura de una palabra clave (keyword)
 * 
 * @interface Keyword
 * @description
 * Representa una palabra clave o término de búsqueda en la aplicación.
 * Se utiliza principalmente en el componente de búsqueda para sugerencias
 * y filtrado de películas.
 * 
 * @property {number} id - Identificador único de la palabra clave
 * @property {string} name - Nombre o texto de la palabra clave
 * 
 * @example
 * const keyword: Keyword = {
 *   id: 1234,
 *   name: "science fiction"
 * };
 * 
 * @usage
 * // En componentes de búsqueda
 * const [keywords, setKeywords] = useState<Keyword[]>([]);
 * 
 * // En resultados de API
 * const searchResults: Keyword[] = await fetchKeywords(searchTerm);
 */
export interface Keyword {
  id: number
  name: string
}