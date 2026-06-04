import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { fadeUp, viewportOnce } from "@/hooks/useReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Encabezado de sección consistente: eyebrow + título + descripción. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={cn(
          "font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-fog sm:text-5xl lg:text-[3.4rem]",
          align === "center" ? "max-w-3xl text-balance" : "max-w-2xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed text-fog-muted sm:text-lg",
            align === "center" ? "max-w-2xl text-pretty" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
