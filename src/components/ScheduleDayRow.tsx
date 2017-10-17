import React from 'react';
import cx from 'classnames';
import dateFormat from 'date-fns/format';
import ScheduleSlot from './ScheduleSlot';
import dateInterval from '../hoc/DateInterval';

interface IProps {
  dateInterval: object;
  calculateWidth(number: number): number;
  day: number;
  className: string;
  slots: Array<any>; // todo
  onAirSlotId: number;
}

const ScheduleDayRow: React.SFC<IProps> = (props: IProps) => {
  const { slots, calculateWidth, onAirSlotId } = props;

  if (slots === undefined) {
    return <div>Nothing is scheduled.</div>;
  }

  return (
    <div className={cx('ScheduleRow', props.className)}>
      <div className="ScheduleRow__inner">
        <div className="ScheduleRow__slots">
          {slots.map((slot, index) => {
            const timeKey = `${dateFormat(
              slot.startDate,
              'hh:mm'
            )}:${dateFormat(slot.endDate, 'hh:mm')}`;

            return (
              <ScheduleSlot
                key={timeKey}
                slot={slot}
                index={index}
                onAir={onAirSlotId === slot.slotId}
                calculateWidth={calculateWidth}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

ScheduleDayRow.defaultProps = {
  className: '',
};

export default dateInterval({ interval: 60000 }, ScheduleDayRow) as any;
