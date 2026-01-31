import type { CalendarDate } from '../types';

/**
 * Generates an array of weekday names based on locale and week start day
 */
export function generateWeekDayNames(
  locale: string = 'en-US',
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
): string[] {
  const baseDate = new Date(2024, 0, 7); // A Sunday (Jan 7, 2024)
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });

  const weekDays: string[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + ((i + weekStartsOn) % 7));
    weekDays.push(formatter.format(date));
  }

  return weekDays;
}

/**
 * Checks if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Checks if a date is a weekend (Saturday or Sunday)
 */
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Gets the start of the month for a given date
 */
function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Gets the end of the month for a given date
 */
function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Gets the start of the week for a given date
 */
function getStartOfWeek(date: Date, weekStartsOn: number): Date {
  const day = date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

/**
 * Generates a 2D array of CalendarDate objects representing weeks in a month view
 */
export function generateCalendarWeeks(
  viewDate: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
  selectedDate: Date | null = null,
  minDate?: Date,
  maxDate?: Date,
  disabledDates: Date[] = []
): CalendarDate[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentMonth = viewDate.getMonth();
  const firstDayOfMonth = getStartOfMonth(viewDate);
  const lastDayOfMonth = getEndOfMonth(viewDate);
  const calendarStart = getStartOfWeek(firstDayOfMonth, weekStartsOn);

  // Generate all days to display (usually 35 or 42 days - 5 or 6 weeks)
  const weeks: CalendarDate[][] = [];
  const currentDate = new Date(calendarStart);

  // Generate up to 6 weeks
  for (let week = 0; week < 6; week++) {
    const weekDays: CalendarDate[] = [];

    for (let day = 0; day < 7; day++) {
      const date = new Date(currentDate);
      const isCurrentMonth = date.getMonth() === currentMonth;
      const isToday = isSameDay(date, today);
      const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

      let isDisabled = false;

      // Check min/max dates
      if (minDate) {
        const min = new Date(minDate);
        min.setHours(0, 0, 0, 0);
        if (date < min) isDisabled = true;
      }

      if (maxDate) {
        const max = new Date(maxDate);
        max.setHours(0, 0, 0, 0);
        if (date > max) isDisabled = true;
      }

      // Check disabled dates array
      if (disabledDates.some((disabledDate) => isSameDay(date, disabledDate))) {
        isDisabled = true;
      }

      weekDays.push({
        date: new Date(date),
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isCurrentMonth,
        isToday,
        isWeekend: isWeekend(date),
        isSelected,
        isDisabled,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push(weekDays);

    // If we've passed the last day of the month and filled at least 4 weeks, we can stop
    // But ensure we always show at least 5 weeks for consistency
    if (week >= 4 && currentDate > lastDayOfMonth) {
      break;
    }
  }

  return weeks;
}
