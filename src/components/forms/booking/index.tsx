import { lazy, Suspense } from "react";

const LazyBookingForm = lazy(() => import("./BookingForm").then((m) => ({ default: m.BookingForm })));

/** Esqueleto de altura equivalente al formulario real — evita salto de layout. */
function BookingFormSkeleton() {
  return (
    <div className="glass h-[820px] animate-pulse rounded-[2rem] p-6 shadow-glow sm:p-9" aria-hidden />
  );
}

/**
 * BookingForm cargado de forma diferida — está bajo el pliegue tanto en la
 * Home como en /contacto, y arrastra react-day-picker.
 */
export function BookingFormLazy() {
  return (
    <Suspense fallback={<BookingFormSkeleton />}>
      <LazyBookingForm />
    </Suspense>
  );
}
