import { SERVICE_FAMILIES } from "@/constants/content/services";
import { isBookableDate, getAvailableSlots } from "./slots";
import type { LocalDate, LocalTime } from "./time";

export interface BookingFormValues {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  fecha: LocalDate | "";
  hora: LocalTime | "";
  aceptaPolitica: boolean;
}

export const OTRO_SERVICIO = "Otro / No estoy seguro";

/** Opciones del desplegable de servicio: las 8 familias del catálogo + "Otro". */
export function getServiceOptions(): string[] {
  return [...SERVICE_FAMILIES.map((f) => f.titulo), OTRO_SERVICIO];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type BookingFieldName = keyof BookingFormValues;

export interface ValidationResult {
  ok: boolean;
  errors: Partial<Record<BookingFieldName, string>>;
  firstInvalid?: BookingFieldName;
}

/** Valida un único campo; devuelve el mensaje de error o `undefined` si es válido. */
export function validateField(
  name: BookingFieldName,
  values: BookingFormValues,
  now: Date = new Date()
): string | undefined {
  switch (name) {
    case "nombre": {
      const v = values.nombre.trim();
      if (!v) return "Escribe tu nombre.";
      if (v.length < 2) return "El nombre es demasiado corto.";
      return undefined;
    }
    case "email": {
      const v = values.email.trim();
      if (!v) return "Escribe tu correo electrónico.";
      if (!EMAIL_RE.test(v)) return "Introduce un correo válido (ej. nombre@empresa.com).";
      return undefined;
    }
    case "telefono": {
      const v = values.telefono.trim();
      if (!v) return "Escribe un teléfono de contacto.";
      if (v.replace(/[^\d]/g, "").length < 7) return "El número parece incompleto.";
      return undefined;
    }
    case "servicio": {
      const v = values.servicio.trim();
      if (!v) return "Selecciona el servicio que te interesa.";
      if (!getServiceOptions().includes(v)) return "Selecciona una opción válida.";
      return undefined;
    }
    case "fecha": {
      if (!values.fecha) return "Elige una fecha.";
      if (!isBookableDate(values.fecha, now)) return "Elige un día disponible (lunes a sábado).";
      return undefined;
    }
    case "hora": {
      if (!values.hora) return "Elige un horario.";
      if (!values.fecha || !isBookableDate(values.fecha, now)) return "Elige primero una fecha válida.";
      if (!getAvailableSlots(values.fecha, now).includes(values.hora)) {
        return "Ese horario ya no está disponible.";
      }
      return undefined;
    }
    case "aceptaPolitica":
      // Se valida en validateBooking (no es un campo de texto con foco propio).
      return undefined;
    default:
      return undefined;
  }
}

const TEXT_FIELDS: BookingFieldName[] = ["nombre", "email", "telefono", "servicio", "fecha", "hora"];

/** Valida el formulario completo; el primer campo inválido queda en `firstInvalid`. */
export function validateBooking(values: BookingFormValues, now: Date = new Date()): ValidationResult {
  const errors: ValidationResult["errors"] = {};
  let firstInvalid: BookingFieldName | undefined;

  for (const field of TEXT_FIELDS) {
    const msg = validateField(field, values, now);
    if (msg) {
      errors[field] = msg;
      if (!firstInvalid) firstInvalid = field;
    }
  }

  if (!values.aceptaPolitica) {
    errors.aceptaPolitica = "Debes aceptar la Política de Privacidad para continuar.";
    if (!firstInvalid) firstInvalid = "aceptaPolitica";
  }

  return { ok: Object.keys(errors).length === 0, errors, firstInvalid };
}
