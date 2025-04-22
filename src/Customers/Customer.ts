import { Ruleset, Assertion, Requirements } from 'self-assert';
import { Time, TimeAsJson } from '../Time/Time';

export interface CustomerAsJson {
  firstName: string;
  lastName: string;
  dni: number;
  fromWorkingHours: TimeAsJson;
  toWorkingHours: TimeAsJson;
}

export class Customer {
  static firstNameAID = 'firstName';
  static lastNameAID = 'lastName';
  static dniAID = 'dni';
  static fromWorkingHoursAID = 'fromWorkingHours';
  static workingHoursAID = 'workingHours';
  static FROM_WORKING_HOURS_MUST_BE_BEFORE_NOON =
    'From working hours must be before noon';
  static FROM_WORKING_HOURS_MUST_BE_BEFORE_TO_WORKING_HOURS =
    'From working hours must be less that to working hours';
  static DNI_MUST_BE_POSITIVE_INTEGER = 'DNI must be a positive integer';
  static LAST_NAME_CAN_NOT_BE_EMPTY = 'Last name can not be empty';
  static FIRST_NAME_CAN_NOT_BE_EMPTY = 'First name can not be empty';

  static fromJson(customerAsJson: CustomerAsJson) {
    return this.named(
      customerAsJson.firstName,
      customerAsJson.lastName,
      customerAsJson.dni,
      Time.fromJson(customerAsJson.fromWorkingHours),
      Time.fromJson(customerAsJson.toWorkingHours)
    );
  }

  static named(
    firstName: string,
    lastName: string,
    dni: number,
    fromWorkingHours: Time,
    toWorkingHours: Time
  ) {
    Ruleset.ensureAll([
      this.firstNameAssertion().evaluateFor(firstName),
      this.lastNameAssertion().evaluateFor(lastName),
      this.dniAssertion().evaluateFor(dni),
      this.fromWorkingHoursAssertion().evaluateFor(fromWorkingHours),
      this.workingHoursAssertion().evaluateFor([
        fromWorkingHours,
        toWorkingHours,
      ]),
    ]);

    return new this(firstName, lastName, dni, fromWorkingHours, toWorkingHours);
  }

  static fromWorkingHoursAssertion() {
    return Assertion.requiring<Time>(
      this.fromWorkingHoursAID,
      this.FROM_WORKING_HOURS_MUST_BE_BEFORE_NOON,
      (aTime) => aTime <= Time.at(12, 0, 0)
    );
  }

  static workingHoursAssertion() {
    return Assertion.requiring<[Time, Time]>(
      this.workingHoursAID,
      this.FROM_WORKING_HOURS_MUST_BE_BEFORE_TO_WORKING_HOURS,
      ([fromWorkingHours, toWorkingHours]) => fromWorkingHours < toWorkingHours
    );
  }

  static dniAssertion() {
    return Assertion.requiring(
      Customer.dniAID,
      this.DNI_MUST_BE_POSITIVE_INTEGER,
      Requirements.isPositiveInteger
    );
  }

  static lastNameAssertion() {
    return Assertion.requiring(
      Customer.lastNameAID,
      this.LAST_NAME_CAN_NOT_BE_EMPTY,
      Requirements.isNotEmpty
    );
  }

  static firstNameAssertion() {
    return Assertion.requiring(
      Customer.firstNameAID,
      this.FIRST_NAME_CAN_NOT_BE_EMPTY,
      Requirements.isNotEmpty
    );
  }

  constructor(
    protected firstName: string,
    protected lastName: string,
    protected dni: number,
    protected fromWorkingHours: Time,
    protected toWorkingHours: Time
  ) {}

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getDNI() {
    return this.dni;
  }

  getFromWorkingHours() {
    return this.fromWorkingHours;
  }

  getToWorkingHours() {
    return this.toWorkingHours;
  }

  isIdentifiedAs(aDNI: number) {
    return this.dni === aDNI;
  }

  syncWith(aCustomerToSyncWith: Customer) {
    this.firstName = aCustomerToSyncWith.getFirstName();
    this.lastName = aCustomerToSyncWith.getLastName();
    this.dni = aCustomerToSyncWith.getDNI();
    this.fromWorkingHours = aCustomerToSyncWith.getFromWorkingHours();
    this.toWorkingHours = aCustomerToSyncWith.getToWorkingHours();
  }
}
