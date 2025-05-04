import React from 'react';
import { IntegerDraftAssistant, SectionDraftAssistant } from 'self-assert';
import { Time } from '../Time';

import { ErrorMessage } from '../../GenericComponents/ErrorMessage';
import { InnerModelFormField } from '../../GenericComponents/InnerModelFormField';

export type TimeDraftAssistant<Model> = SectionDraftAssistant<
  Time,
  Model,
  [hour: number, minute: number, second: number]
> & {
  hour: IntegerDraftAssistant<Time>;
  minute: IntegerDraftAssistant<Time>;
  second: IntegerDraftAssistant<Time>;
};

export class TimeView<ContainerModel> extends React.Component<{
  formCompletionAssistant: TimeDraftAssistant<ContainerModel>;
}> {
  static createFormAssistant<ContainerModel>(
    getterFromContainerModel: (model: ContainerModel) => Time,
    assertionsId = []
  ): TimeDraftAssistant<ContainerModel> {
    const hourAssistant = IntegerDraftAssistant.for<Time>('', (time) =>
      time.getHour()
    );
    const minuteAssistant = IntegerDraftAssistant.for<Time>('', (time) =>
      time.getMinute()
    );
    const secondAssistant = IntegerDraftAssistant.for<Time>('', (time) =>
      time.getSecond()
    );

    const timeAssistant = SectionDraftAssistant.with(
      [hourAssistant, minuteAssistant, secondAssistant],
      (hour, minute, second) => Time.at(hour, minute, second),
      getterFromContainerModel,
      assertionsId
    );

    return Object.assign(timeAssistant, {
      hour: hourAssistant,
      minute: minuteAssistant,
      second: secondAssistant,
    });
  }

  render() {
    const { formCompletionAssistant } = this.props;

    return (
      <div>
        <div
          className="d-flex align-items-center gap-1"
          style={{ width: '250px' }}
        >
          <InnerModelFormField
            inputName="hour"
            inputPlaceHolder="00"
            formCompletionAssistant={formCompletionAssistant.hour}
            doNotShowErrorMessage={true}
          />
          <span>:</span>
          <InnerModelFormField
            inputName="minute"
            inputPlaceHolder="00"
            formCompletionAssistant={formCompletionAssistant.minute}
            doNotShowErrorMessage={true}
          />
          <span>:</span>
          <InnerModelFormField
            inputName="second"
            inputPlaceHolder="00"
            formCompletionAssistant={formCompletionAssistant.second}
            doNotShowErrorMessage={true}
          />
        </div>
        <ErrorMessage draftAssistant={formCompletionAssistant} />
      </div>
    );
  }
}
