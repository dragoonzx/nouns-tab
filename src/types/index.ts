export interface Engine {
  /**
   * Standard index of the array item.
   */
  position: number;

  /**
   * The display name of the search Engine.
   */
  name?: string;

  /**
   * The query url.
   * @example 'https://www.google.com/search?q='
   */
  url: string;

  /**
   * SVG in a Svelte Component
   */
  icon: any;

  /**
   * Alias to set search engine.
   * @example Typing 'g ' will activate google'
   */
  alias: string;
}
