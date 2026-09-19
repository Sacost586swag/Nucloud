import { CheckCircle2 } from "lucide-react";
import { WhatsAppCTA } from "@/components/whatsapp/WhatsAppCTA";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface BookingSuccessProps {
  onReset: () => void;
}

/** Panel mostrado tras un envío exitoso de la solicitud de agendamiento. */
export function BookingSuccess({ onReset }: BookingSuccessProps) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full border border-flame/30 bg-flame/[0.1] text-flame shadow-glow-sm">
        <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
      </span>
      <h3 className="mt-6 font-display text-2xl font-semibold text-fog">¡Solicitud de cita recibida!</h3>
      <p className="mt-3 max-w-sm text-pretty text-fog-muted">
        Te confirmamos por WhatsApp o correo en menos de 24 horas para dejar tu cita agendada.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <WhatsAppCTA>
          <WhatsAppIcon className="h-4 w-4" />
          Adelantar por WhatsApp
        </WhatsAppCTA>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-fog-muted transition-colors hover:text-fog"
        >
          Enviar otra solicitud
        </button>
      </div>
    </div>
  );
}
