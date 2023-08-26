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

// export const toZoned = (arr) =>
//   arr.map((obj) =>
//     Object.values(obj).map((instant) => instant.toZonedDateTimeISO(timeZone))
//   );

// const zoned = mockPickerTimes.map(toZoned);
// console.log(zoned);
export const toIntervals = (pickerTimes) =>
  new Interval(
    Temporal.Instant.from(pickerTimes.minimum).toZonedDateTimeISO(timeZone),
    Temporal.Instant.from(pickerTimes.maximum).toZonedDateTimeISO(timeZone)
  );

const arrayOfIntervals = mockPickerTimes.map(toIntervals);
console.log(arrayOfIntervals);
/*
[
  Interval {
    start: Temporal.Instant <2023-08-25T23:45:00Z>,
    end: Temporal.Instant <2023-08-26T00:15:00Z>
  },
  Interval {
    start: Temporal.Instant <2023-08-26T23:45:00Z>,
    end: Temporal.Instant <2023-08-27T00:15:00Z>
  }
]
*/

const selectData = arrayOfIntervals.map((interval, index, timeZone) => ({
  key: index,
  slots: Array.from(
    interval.iterate(Temporal.Duration.from({ minutes: intervalIncrement })),
    (timeSlot, i, timeZone) => ({
      text: timeSlot.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }),
      value: timeSlot.toInstant(),
    })
  ),
}));

/*
[
  {
    key: 0,
    slots: [
      Temporal.Instant <2023-08-25T23:45:00Z>,
      Temporal.Instant <2023-08-26T00:00:00Z>
    ]
  },
  {
    key: 1,
    slots: [
      Temporal.Instant <2023-08-26T23:45:00Z>,
      Temporal.Instant <2023-08-27T00:00:00Z>
    ]
  }
]
*/

console.log(JSON.stringify(selectData));
