import { CustomersAgenda } from '../Customers/System/CustomersAgenda';
import { CustomersAgendaServer } from '../Customers/System/CustomersAgendaServer';
// import {SalesBookServer} from "../Accounting/System/SalesBookServer";

export class ALaGorraServerSystem {
  static start(
    server: typeof import('../Server').worker,
    baseUrl: string,
    customersAgenda: CustomersAgenda
    // , salesBook
  ) {
    new CustomersAgendaServer(server, baseUrl, customersAgenda);
    // new SalesBookServer(server, salesBook);
  }
}
