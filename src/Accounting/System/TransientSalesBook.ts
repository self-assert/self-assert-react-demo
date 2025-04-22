import { Ruleset } from 'self-assert';
import { Invoice } from '../Invoice';
import { SalesBook } from './SalesBook';

export class TransientSalesBook extends SalesBook {
  protected invoices: Invoice[] = [];

  constructor() {
    super();
    this.invoices = [];
  }

  async getInvoices(): Promise<Invoice[]> {
    return [...this.invoices];
  }

  async register(anInvoice: Invoice): Promise<void> {
    await Ruleset.workOn(
      this.issuedSameDateOrAfterToAssertion(anInvoice),
      this.lastInvoiceHasPreviousNumberToAssertion(anInvoice)
    );

    this.invoices.push(anInvoice);
  }

  async hasLastInvoicePreviousNumberTo(anInvoice: Invoice): Promise<boolean> {
    return this.withLastInvoice(
      (lastInvoice) => lastInvoice.isPreviousNumberTo(anInvoice),
      () => true
    );
  }

  async wasLastInvoiceIssuedSameDateOrAfterTo(
    anInvoice: Invoice
  ): Promise<boolean> {
    return this.withLastInvoice(
      (lastInvoice) => lastInvoice.wasIssuedSameDateOrBefore(anInvoice),
      () => true
    );
  }

  withLastInvoice<ReturnType>(
    aLastInvoiceClosure: (aLastInvoice: Invoice) => ReturnType,
    noneInvoiceClosure: () => ReturnType
  ) {
    if (this.invoices.length === 0) return noneInvoiceClosure();

    return aLastInvoiceClosure(this.invoices[this.invoices.length - 1]);
  }

  hasRegistered(anInvoice: Invoice) {
    return this.invoices.includes(anInvoice);
  }
}
