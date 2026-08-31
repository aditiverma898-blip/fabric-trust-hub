import { BadgeCheck, ShoppingBag } from "lucide-react";
import type { FabricDNA } from "@/data/wishlist";

export function FabricDnaPanel({
  dna,
  onMoveToBag,
}: {
  dna: FabricDNA;
  onMoveToBag: () => void;
}) {
  const extra = (dna.studioPhotoCount ?? 3) - 3;

  return (
    <div className="space-y-3 border-t border-border px-3 pb-3 pt-3">
      <div className="flex items-center justify-between rounded-lg bg-panel px-3 py-3">
        <div>
          <p className="text-[13px] font-bold text-foreground">Fabric Truth Score</p>
          <p className="text-[12px] text-muted-foreground">{dna.fabricSummary}</p>
        </div>
        <div className="flex h-11 w-12 items-center justify-center rounded-lg border-2 border-score text-[17px] font-bold text-score">
          {dna.truthScore}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-bold text-foreground">
          Studio Proof{" "}
          <span className="font-normal text-muted-foreground">(Real fits)</span>
        </p>
        <div className="flex gap-2">
          {dna.studioImageUrls.map((url, i) => (
            <div key={i} className="relative h-16 w-20 overflow-hidden rounded-md">
              <img
                src={url}
                alt={`Unedited creator photo ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {i === 2 && extra > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/55 text-[13px] font-bold text-background">
                  +{extra}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {dna.workingProGuaranteeEligible ? (
        <div className="flex gap-2.5 rounded-lg border border-primary/25 bg-accent px-3 py-2.5">
          <ShoppingBag className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" />
          <div>
            <p className="text-[13px] font-bold text-foreground">Working-Pro Guarantee</p>
            <ul className="mt-0.5 space-y-0.5 text-[12px] text-muted-foreground">
              <li>• 7-Day Instant Refunds</li>
              <li>• Guaranteed 7-10 PM / Weekend Pickups</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-muted px-3 py-2.5 text-[12px] text-muted-foreground">
          Working-Pro Guarantee unavailable for this item — standard 10 AM-7 PM
          pickups apply.
        </div>
      )}

      <button
        onClick={onMoveToBag}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-[15px] font-bold text-primary-foreground transition-colors active:bg-primary/90"
      >
        <ShoppingBag className="h-[18px] w-[18px]" />
        Move to Bag
      </button>
    </div>
  );
}

export function FabricDnaBadge() {
  return (
    <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 shadow-sm">
      <BadgeCheck className="h-4 w-4 text-score" />
      <span className="text-[11px] font-bold tracking-wide text-foreground">
        FABRICDNA VERIFIED
      </span>
    </div>
  );
}
