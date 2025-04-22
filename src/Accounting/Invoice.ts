import { Assertion, Requirements, Ruleset } from 'self-assert';

export interface InvoiceAsJson {
  issueDate: string;
  number: number;
  addressee: string;
  total: number;
}

export class Invoice {
  static numberAID = 'numberAID';
  static INVALID_NUMBER = 'Accounting number must be an integer greater than 0';
  static totalAID = 'totalAID';
  static INVALID_TOTAL = 'Total must be greater than 0';

  static fromJson(invoiceAsJson: InvoiceAsJson) {
    return this.at(
      invoiceAsJson.issueDate,
      Number(invoiceAsJson.number),
      invoiceAsJson.addressee,
      Number(invoiceAsJson.total)
    );
  }

  static at(
    anIssueDate: string,
    aNumber: number,
    anAddressee: string,
    aTotal: number
  ) {
    Ruleset.ensureAll([
      this.numberAssertionFor(aNumber),
      this.totalAssertionFor(aTotal),
    ]);

    return new this(anIssueDate, aNumber, anAddressee, aTotal);
  }

  static totalAssertionFor(aTotal: number) {
    return Assertion.requiring(
      this.totalAID,
      this.INVALID_TOTAL,
      Requirements.isPositive
    ).evaluateFor(aTotal);
  }

  static numberAssertionFor(aNumber: number) {
    return Assertion.requiring(
      this.numberAID,
      this.INVALID_NUMBER,
      Requirements.isPositiveInteger
    ).evaluateFor(aNumber);
  }

  constructor(
    protected issueDate: string,
    protected number: number,
    protected addressee: string,
    protected total: number
  ) {}

  wasIssuedOn(aPotentialIssueDate: string) {
    return this.issueDate === aPotentialIssueDate;
  }

  wasIssuedSameDateOrBefore(anInvoice: Invoice) {
    return this.issueDate <= anInvoice.getIssueDate();
  }

  getIssueDate() {
    return this.issueDate;
  }

  isNumbered(aPotentialNumber: number) {
    return this.number === aPotentialNumber;
  }

  isPreviousNumberTo(anInvoice: Invoice) {
    return this.number + 1 === anInvoice.getNumber();
  }

  getNumber() {
    return this.number;
  }

  wasAddressTo(aPotentialAddressee: string) {
    return (
      this.addressee.localeCompare(aPotentialAddressee, undefined, {
        sensitivity: 'base',
      }) === 0
    );
  }

  isTotal(aPotentialTotal: number) {
    return this.total === aPotentialTotal;
  }

  getAddressee() {
    return this.addressee;
  }

  getTotal() {
    return this.total;
  }
}
