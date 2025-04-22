import { CustomersAgenda } from './CustomerAgenda';

/**
 * Original comment by {@link https://github.com/hernanwilkinson @hernanwilkinson}:
 *
 * en: This is where the database access implementation would go\
 * es: Aca iria toda la implementación de acceso a la base de datos
 *
 * His original example included a working server that shared
 * the `CustomerAgenda` classes with the frontend application.
 * It shows how modelling **sets of objects** aids the separation
 * of concerns, in this case between the application and the persistence layer,
 * and improves the design of the system.
 *
 * Reference: <https://github.com/hernanwilkinson/disenioALaGorra/tree/a6d90a0044bf69f98fb50584872b226bf678e67b/Temporada01/Episodio03%20-%20Modelar%20los%20Conjuntos%20de%20Objetos>
 */
// @ts-expect-error Missing implementation
export class PersistentCustomersAgenda extends CustomersAgenda {}
