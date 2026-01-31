export type CalendarDate = {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  isDisabled: boolean;
};

export type UseCalendarOptions = {
  defaultDate?: Date;
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.
};

export type UseCalendarReturn = {
  today: Date;
  currentMonth: number;
  currentYear: number;
  weeks: CalendarDate[][];
  days: CalendarDate[];
  weekDays: string[];
  monthName: string;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
};
