import { Assertion, Requirements, Ruleset } from 'self-assert';

export interface TimeAsJson {
  hour: number;
  minute: number;
  second: number;
}

export class Time {
  static readonly hourAID = 'hour';
  static readonly INVALID_HOUR = 'Hour must be an integer between 0 and 23';
  static readonly minuteAID = 'minute';
  static readonly INVALID_MINUTE = 'Minute must be an integer between 0 and 59';
  static readonly secondAID = 'second';
  static readonly INVALID_SECOND = 'Second must be an integer between 0 and 59';

  static at(hour: number, minute: number, second: number) {
    Ruleset.ensureAll([
      this.hourAssertion().evaluateFor(hour),
      this.minuteAssertion().evaluateFor(minute),
      this.secondAssertion().evaluateFor(second),
    ]);

    return new this(hour, minute, second);
  }

  static hourAssertion() {
    const requirement = Requirements.isIntegerBetween(0, 23);
    return Assertion.requiring(
      Time.hourAID,
      Time.INVALID_HOUR,
      requirement
    );
  }

  static minuteAssertion() {
    return Assertion.requiring<number>(
      Time.minuteAID,
      Time.INVALID_MINUTE,
      Requirements.isIntegerBetween(0, 59)
    );
  }

  static secondAssertion() {
    return Assertion.requiring<number>(
      Time.secondAID,
      Time.INVALID_SECOND,
      Requirements.isIntegerBetween(0, 59)
    );
  }

  static fromJson({ hour, minute, second }: TimeAsJson) {
    return this.at(hour, minute, second);
  }

  protected constructor(
    protected hour: number,
    protected minute: number,
    protected second: number
  ) {}

  isAt(hour: number, minute: number, second: number): boolean {
    return (
      this.hour === hour && this.minute === minute && this.second === second
    );
  }

  valueOf(): number {
    return this.hour * 3600 + this.minute * 60 + this.second;
  }

  getHour(): number {
    return this.hour;
  }

  getMinute(): number {
    return this.minute;
  }

  getSecond(): number {
    return this.second;
  }
}
