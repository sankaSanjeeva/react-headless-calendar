# 📅 useCalendar

A powerful, flexible, and headless calendar hook for React. Build beautiful date pickers, calendars, and date range selectors with complete control over styling and behavior.

## ✨ Features

- 🎨 **Headless** - Complete control over UI and styling
- 🌍 **i18n Support** - Full internationalization with locale support
- ♿ **Accessible** - Built with accessibility in mind
- 📦 **Lightweight** - Zero dependencies (except React)
- 🎯 **TypeScript** - Full type safety out of the box
- 🔧 **Flexible** - Controlled and uncontrolled modes
- 🚀 **Modern** - Built with React hooks

## 📦 Installation

```bash
npm install @sanka/react-headless-calendar
```

```bash
yarn add @sanka/react-headless-calendar
```

```bash
pnpm add @sanka/react-headless-calendar
```

## 🚀 Quick Start

```tsx
import { useCalendar } from '@sanka/react-headless-calendar';

function Calendar() {
  const {
    weeks,
    weekDays,
    monthName,
    currentYear,
    goToNextMonth,
    goToPreviousMonth,
  } = useCalendar();

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ←
        </button>

        <h2 className="text-lg font-semibold">
          {monthName} {currentYear}
        </h2>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      {/* Days */}
      {weeks.map((week, i) => (
        <div key={i} className="grid grid-cols-7 gap-2 mb-2">
          {week.map((day) => (
            <button
              key={day.date.toISOString()}
              disabled={!day.isCurrentMonth}
              className={`
                aspect-square rounded flex items-center justify-center
                ${day.isCurrentMonth ? 'hover:bg-gray-100' : 'text-gray-300'}
                ${day.isToday ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
              `}
            >
              {day.day}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
```

**Happy coding!** 🚀

**If you find this useful, please give it a star. Thanks!** ⭐
