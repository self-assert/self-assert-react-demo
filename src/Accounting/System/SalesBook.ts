import { Inquiry } from 'self-assert';
import type { Invoice } from '../Invoice';

export abstract class SalesBook {
  static issueDateAID = 'issueDateAID';
  static INVALID_ISSUED_DATE =
    'New invoice date must be equal or after last registered invoice';
  static numberAID = 'numberAID';
  static INVALID_NUMBER =
    'New invoice number must be the next one to last registered invoice';

  abstract getInvoices(): Promise<Invoice[]>;

  abstract register(anInvoice: Invoice): Promise<void>;

  abstract hasLastInvoicePreviousNumberTo(anInvoice: Invoice): Promise<boolean>;

  abstract wasLastInvoiceIssuedSameDateOrAfterTo(
    anInvoice: Invoice
  ): Promise<boolean>;

  lastInvoiceHasPreviousNumberToAssertion(anInvoice: Invoice) {
    return Inquiry.requiring(
      SalesBook.numberAID,
      SalesBook.INVALID_NUMBER,
      () => this.hasLastInvoicePreviousNumberTo(anInvoice)
    );
  }

  issuedSameDateOrAfterToAssertion(anInvoice: Invoice) {
    return Inquiry.requiring(
      SalesBook.issueDateAID,
      SalesBook.INVALID_ISSUED_DATE,
      () => this.wasLastInvoiceIssuedSameDateOrAfterTo(anInvoice)
    );
  }
}
