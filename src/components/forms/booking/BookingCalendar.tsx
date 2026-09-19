import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isBookableDate, getBookingWindow } from "@/lib/booking/slots";
import { toLocalDate, fromLocalDate, type LocalDate } from "@/lib/booking/time";

interface BookingCalendarProps {
  value: LocalDate | "";
  onChange: (date: LocalDate) => void;
  now?: Date;
}

/**
 * Calendario de agenda (react-day-picker) estilizado 100% con Tailwind — sin
 * importar la hoja de estilos por defecto de la librería (Principios I/II:
 * ningún CSS de terceros con tipografía/color ajenos a la marca). Deshabilita
 * fechas según la misma lógica pura (`isBookableDate`) que usa la validación.
 */
export function BookingCalendar({ value, onChange, now = new Date() }: BookingCalendarProps) {
  const { min } = getBookingWindow(now);

  return (
    <DayPicker
      mode="single"
      locale={es}
      weekStartsOn={1}
      defaultMonth={fromLocalDate(min)}
      selected={value ? fromLocalDate(value) : undefined}
      onSelect={(date) => date && onChange(toLocalDate(date))}
      disabled={(date) => !isBookableDate(toLocalDate(date), now)}
      components={{
        Chevron: ({ orientation, ...props }) =>
          orientation === "left" ? (
            <ChevronLeft {...props} className="h-4 w-4" />
          ) : (
            <ChevronRight {...props} className="h-4 w-4" />
          ),
      }}
      classNames={{
        root: "text-fog",
        months: "flex flex-col",
        month: "space-y-4",
        month_caption: "relative flex items-center justify-center px-8 pb-2",
        caption_label: "font-display text-base font-semibold capitalize text-fog",
        nav: "contents",
        button_previous:
          "absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full text-fog-muted transition-colors hover:bg-white/[0.06] hover:text-fog disabled:opacity-30",
        button_next:
          "absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-full text-fog-muted transition-colors hover:bg-white/[0.06] hover:text-fog disabled:opacity-30",
        month_grid: "w-full border-collapse",
        weekdays: "",
        weekday: "pb-2 text-center font-mono text-[11px] uppercase tracking-wider text-fog-muted",
        week: "",
        day: "p-0.5 text-center align-middle",
        day_button:
          "grid h-9 w-9 place-items-center rounded-full text-sm text-fog transition-colors hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-flame-glow disabled:text-fog-muted/25 disabled:hover:bg-transparent disabled:cursor-not-allowed",
        selected: "[&>button]:!bg-flame-gradient [&>button]:!text-ink [&>button]:font-semibold",
        today: "[&>button]:border [&>button]:border-flame/50",
        outside: "[&>button]:text-fog-muted/20",
      }}
    />
  );
}
