import { useEffect, useState } from "react";
import { BadgeCheck, Check, ShoppingBag, X } from "lucide-react";
import type { FabricDNA } from "@/data/wishlist";

export function FabricDnaPanel({
  dna,
  onMoveToBag,
}: {
  dna: FabricDNA;
  onMoveToBag: () => void;
}) {
  const extra = (dna.studioPhotoCount ?? 3) - 3;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 3000);
    return () => clearTimeout(t);
  }, [added]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightboxIndex(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const handleMoveToBag = () => {
    onMoveToBag();
    setAdded(true);
  };

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

      {dna.fabricStats && (
        <div className="space-y-2 rounded-lg bg-panel px-3 py-3">
          {dna.fabricStats.map((stat) => (
            <div key={stat.label}>
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="font-semibold text-foreground">{stat.label}</span>
                <span className="font-bold text-score">{stat.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-score transition-all duration-700 ease-out"
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="mb-2 text-[13px] font-bold text-foreground">
          Studio Proof{" "}
          <span className="font-normal text-muted-foreground">(Real fits)</span>
        </p>
        <div className="flex gap-2">
          {dna.studioImageUrls.map((url, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="relative h-16 w-20 overflow-hidden rounded-md transition-transform active:scale-95"
              aria-label={`View verified user photo ${i + 1}`}
            >
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
            </button>
          ))}
        </div>
      </div>

      {dna.workingProGuaranteeEligible ? (
        <div className="flex gap-2.5 rounded-lg border border-primary/25 bg-accent px-3 py-2.5">
          <ShoppingBag className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" />
          <div>
            <p className="text-[13px] font-bold text-foreground">Working-Pro Guarantee</p>
            <ul className="mt-0.5 space-y-0.5 text-[12px] text-muted-foreground">
              <li>• Instant Doorstep Refunds (7-Day Window)</li>
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
        onClick={handleMoveToBag}
        className={`flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[15px] font-bold text-primary-foreground transition-all duration-300 ease-out active:scale-[0.98] ${
          added ? "bg-success shadow-md" : "bg-primary active:bg-primary/90"
        }`}
      >
        {added ? (
          <span className="animate-scale-in flex items-center gap-2">
            <Check className="h-[18px] w-[18px]" />
            Added to Bag
          </span>
        ) : (
          <>
            <ShoppingBag className="h-[18px] w-[18px]" />
            Move to Bag
          </>
        )}
      </button>

      {lightboxIndex !== null && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-foreground/90 p-6"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-card transition-colors hover:bg-card/30"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={dna.studioImageUrls[lightboxIndex]}
            alt={`Verified user photo ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="animate-scale-in max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
          />
          <p className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-card">
            <BadgeCheck className="h-4 w-4 text-success" />
            Verified user photo
          </p>
        </div>
      )}
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
