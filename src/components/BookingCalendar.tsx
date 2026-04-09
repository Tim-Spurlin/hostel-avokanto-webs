import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

interface BookingCalendarProps {
  onRangeSelect?: (checkIn: Date | null, checkOut: Date | null) => void;
}

export default function BookingCalendar({ onRangeSelect }: BookingCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [hovered, setHovered] = useState<Date | null>(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
  const leadingDays = firstDayOfWeek;

  const totalCells = Math.ceil((leadingDays + daysInMonth) / 7) * 7;
  const trailingDays = totalCells - leadingDays - daysInMonth;

  const toDate = (y: number, m: number, d: number) => new Date(y, m, d);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isBetween = (date: Date, a: Date, b: Date) => {
    const t = date.getTime();
    const lo = Math.min(a.getTime(), b.getTime());
    const hi = Math.max(a.getTime(), b.getTime());
    return t > lo && t < hi;
  };

  const isPast = (date: Date) => {
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < t;
  };

  const handleDayClick = (date: Date) => {
    if (isPast(date)) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      onRangeSelect?.(date, null);
    } else {
      if (isSameDay(date, checkIn)) { setCheckIn(null); return; }
      const [ci, co] = date < checkIn ? [date, checkIn] : [checkIn, date];
      setCheckOut(co);
      setCheckIn(ci);
      onRangeSelect?.(ci, co);
    }
  };

  const cellClass = (date: Date, isCurrentMonth: boolean) => {
    const base =
      "h-9 w-full flex items-center justify-center text-sm cursor-pointer select-none rounded transition-colors";
    if (!isCurrentMonth) return `${base} text-gray-300 cursor-default`;
    if (isPast(date)) return `${base} text-gray-300 cursor-not-allowed`;

    const isCheckIn = checkIn && isSameDay(date, checkIn);
    const isCheckOut = checkOut && isSameDay(date, checkOut);
    const rangeEnd = checkOut ?? hovered;
    const inRange = checkIn && rangeEnd && isBetween(date, checkIn, rangeEnd);

    if (isCheckIn || isCheckOut)
      return `${base} bg-[#c8614a] text-white font-semibold`;
    if (inRange) return `${base} bg-[#f5e0da] text-[#c8614a]`;
    return `${base} hover:bg-[#f5e0da] text-gray-700`;
  };

  type Cell = { date: Date; currentMonth: boolean };
  const cells: Cell[] = [];

  for (let i = leadingDays - 1; i >= 0; i--) {
    cells.push({
      date: toDate(viewYear, viewMonth - 1, prevMonthDays - i),
      currentMonth: false,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: toDate(viewYear, viewMonth, d), currentMonth: true });
  }
  for (let d = 1; d <= trailingDays; d++) {
    cells.push({ date: toDate(viewYear, viewMonth + 1, d), currentMonth: false });
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-semibold text-gray-800 text-base">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-semibold text-gray-400 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map(({ date, currentMonth }, idx) => (
          <div
            key={idx}
            className={cellClass(date, currentMonth)}
            onClick={() => currentMonth && handleDayClick(date)}
            onMouseEnter={() => currentMonth && !isPast(date) && setHovered(date)}
            onMouseLeave={() => setHovered(null)}
          >
            {date.getDate()}
          </div>
        ))}
      </div>

      {(checkIn || checkOut) && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
          <span>
            Check-in:{" "}
            <strong className="text-gray-700">
              {checkIn ? checkIn.toLocaleDateString() : "—"}
            </strong>
          </span>
          <span>
            Check-out:{" "}
            <strong className="text-gray-700">
              {checkOut ? checkOut.toLocaleDateString() : "—"}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
