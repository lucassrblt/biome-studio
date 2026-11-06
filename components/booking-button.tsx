import type { ReactNode } from "react";
import { MagneticButton } from "@/components/magnetic";
import { booking, resolveBookingEvent, type BookingEvent } from "@/lib/content";

/**
 * Bouton de prise de rendez-vous Cal.com, ouvert en **popup** au clic (via
 * `data-cal-link` + l'embed chargé par <CalEmbed/>).
 *
 * - `event` choisit le rendez-vous : « intro » (15 min, défaut) ou « audit »
 *   (30 min). Un événement sans lien retombe sur l'appel de 15 min — le libellé
 *   par défaut suit, pour ne jamais annoncer une durée fausse.
 * - `href` = lien Cal.com direct → repli si le JS d'embed n'a pas chargé.
 * - `magnetic` reprend l'effet d'attraction (hero, header) ; sinon simple <a>.
 */
export function BookingButton({
  className,
  children,
  event = "intro",
  magnetic = false,
}: {
  className?: string;
  /** Contenu du bouton ; par défaut le libellé de l'événement résolu. */
  children?: ReactNode;
  event?: BookingEvent;
  magnetic?: boolean;
}) {
  const resolved = resolveBookingEvent(event);
  const href = `${booking.calOrigin}/${resolved.calLink}`;
  const calProps = {
    "data-cal-link": resolved.calLink,
    "data-cal-config": '{"layout":"month_view"}',
  };
  const content = children ?? resolved.label;

  if (magnetic) {
    return (
      <MagneticButton href={href} target="_blank" rel="noreferrer" className={className} {...calProps}>
        {content}
      </MagneticButton>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} {...calProps}>
      {content}
    </a>
  );
}
