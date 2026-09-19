import { useEffect, useRef } from "react";
import { WHATSAPP_NUMBERS } from "@/constants/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/utils/cn";

interface WhatsAppPickerProps {
  id?: string;
  onSelect?: () => void;
  className?: string;
}

/**
 * Panel del selector de WhatsApp: lista ambos números de NUCLOUD como
 * opciones equivalentes, sin ninguna etiqueta que distinga su función
 * (Principio VI / FR-026). Puramente presentacional — el padre decide cuándo
 * montarlo (abrir) y desmontarlo (cerrar); ver useWhatsAppPicker.ts.
 */
export function WhatsAppPicker({ id, onSelect, className }: WhatsAppPickerProps) {
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    firstItemRef.current?.focus();
  }, []);

  return (
    <div
      id={id}
      role="menu"
      aria-label="Elegir número de WhatsApp"
      className={cn(
        "glass flex w-64 flex-col gap-1 rounded-2xl border border-white/[0.08] p-2 shadow-card",
        className
      )}
    >
      {WHATSAPP_NUMBERS.map((num, i) => (
        <a
          key={num.valor}
          ref={i === 0 ? firstItemRef : undefined}
          role="menuitem"
          href={num.enlace}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSelect}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] text-fog transition-colors hover:bg-white/[0.06]"
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0 text-flame" />
          {num.etiqueta}
        </a>
      ))}
    </div>
  );
}
