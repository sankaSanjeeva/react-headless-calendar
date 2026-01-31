import { useCallback, useMemo, useState } from 'react';
import { generateCalendarWeeks, generateWeekDayNames } from './utils';
import type { UseCalendarOptions, UseCalendarReturn } from '../types';

export function useCalendar(
  options: UseCalendarOptions = {}
): UseCalendarReturn {
  const {
    defaultDate = new Date(),
    locale = 'en-US',
    weekStartsOn = 0,
  } = options;

  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(defaultDate);

  const weeks = useMemo(() => {
    // Generate 2D array of dates for the current month view
    // Include dates from previous/next month to fill the grid
    return generateCalendarWeeks(viewDate, weekStartsOn);
  }, [viewDate, weekStartsOn]);

  const days = useMemo(() => weeks.flat(), [weeks]);

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const monthName = useMemo(() => {
    return new Intl.DateTimeFormat(locale, { month: 'long' }).format(viewDate);
  }, [viewDate, locale]);

  const weekDays = useMemo(() => {
    return generateWeekDayNames(locale, weekStartsOn);
  }, [locale, weekStartsOn]);

  const goToNextMonth = useCallback(() => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  }, [viewDate]);

  const goToPreviousMonth = useCallback(() => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setViewDate(newDate);
  }, [viewDate]);

  return {
    today,
    currentMonth,
    currentYear,
    weeks,
    days,
    weekDays,
    monthName,
    goToNextMonth,
    goToPreviousMonth,
  };
}
