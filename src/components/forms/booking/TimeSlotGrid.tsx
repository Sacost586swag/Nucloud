import { getAvailableSlots } from "@/lib/booking/slots";
import type { LocalDate, LocalTime } from "@/lib/booking/time";
import { cn } from "@/utils/cn";

interface TimeSlotGridProps {
  date: LocalDate | "";
  value: LocalTime | "";
  onChange: (time: LocalTime) => void;
  now?: Date;
  name: string;
}

function splitByPeriod(slots: LocalTime[]) {
  return {
    morning: slots.filter((s) => Number(s.split(":")[0]) < 12),
    afternoon: slots.filter((s) => Number(s.split(":")[0]) >= 12),
  };
}

/** Bloques de 30 min agrupados Mañana/Tarde, como radiogroup accesible. */
export function TimeSlotGrid({ date, value, onChange, now = new Date(), name }: TimeSlotGridProps) {
  if (!date) {
    return <p className="text-sm text-fog-muted">Elige primero una fecha para ver los horarios disponibles.</p>;
  }

  const slots = getAvailableSlots(date, now);
  if (slots.length === 0) {
    return <p className="text-sm text-fog-muted">No hay horarios disponibles ese día.</p>;
  }

  const { morning, afternoon } = splitByPeriod(slots);

  return (
    <div role="radiogroup" aria-label="Hora de la cita (hora de Ecuador, GMT-5)" className="flex flex-col gap-4">
      {morning.length > 0 && (
        <SlotGroup label="Mañana" slots={morning} value={value} onChange={onChange} name={name} />
      )}
      {afternoon.length > 0 && (
        <SlotGroup label="Tarde" slots={afternoon} value={value} onChange={onChange} name={name} />
      )}
      <p className="text-xs text-fog-muted">Hora de Ecuador (GMT-5).</p>
    </div>
  );
}

interface SlotGroupProps {
  label: string;
  slots: LocalTime[];
  value: LocalTime | "";
  onChange: (time: LocalTime) => void;
  name: string;
}

function SlotGroup({ label, slots, value, onChange, name }: SlotGroupProps) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-fog-muted">{label}</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((slot) => {
          const checked = value === slot;
          return (
            <label
              key={slot}
              className={cn(
                "cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm transition-colors",
                checked
                  ? "border-flame bg-flame/[0.12] font-semibold text-flame"
                  : "border-white/10 bg-white/[0.02] text-fog hover:border-white/20"
              )}
            >
              <input
                type="radio"
                name={name}
                value={slot}
                checked={checked}
                onChange={() => onChange(slot)}
                className="sr-only"
              />
              {slot}
            </label>
          );
        })}
      </div>
    </div>
  );
}
