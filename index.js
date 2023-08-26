import { Temporal } from '@js-temporal/polyfill';

// run setTemporalPolyfill as early as possible
import Interval, { setTemporalPolyfill } from 'temporal-interval';
setTemporalPolyfill(Temporal);

const intervalIncrement = 15; // minutes
const timeZone = 'America/New_York';
const mockPickerTimes = [
  {
    minimum: '2023-08-25T23:45:00Z',
    maximum: '2023-08-26T00:15:00Z',
  },
  {
    minimum: '2023-08-26T23:45:00Z',
    maximum: '2023-08-27T00:15:00Z',
  },
];

export const toIntervals = (pickerTimes) =>
  new Interval(
    Temporal.Instant.from(pickerTimes.minimum).toZonedDateTimeISO(timeZone),
    Temporal.Instant.from(pickerTimes.maximum).toZonedDateTimeISO(timeZone)
  );

const arrayOfIntervals = mockPickerTimes.map(toIntervals);

const generateSelectOption = (timeSlot) => ({
  text: timeSlot.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }),
  value: timeSlot.toInstant(),
});
const selectData = arrayOfIntervals.map((interval, index, timeZone) => ({
  key: index,
  slots: Array.from(
    interval.iterate(Temporal.Duration.from({ minutes: intervalIncrement })),
    generateSelectOption
  ),
}));

console.log(JSON.stringify(selectData));
