import { useEffect, useState } from "react";
import { BadgeCheck, Check, Images, ShoppingBag, Sparkles, X, Scale } from "lucide-react";
import type { FabricDNA } from "@/data/wishlist";

export function FabricDnaPanel({
  dna,
  coverImage,
  onMoveToBag,
}: {
  dna: FabricDNA;
  coverImage?: string;
  onMoveToBag: () => void;
}) {
  const photos = dna.studioImageUrls;
  const [showReel, setShowReel] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 3000);
    return () => clearTimeout(t);
  }, [added]);

  useEffect(() => {
    if (!showReel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowReel(false);
    window.addEventListener("keydown", onKey);
    // lock body scroll while the reel is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showReel]);

  const handleMoveToBag = () => {
    onMoveToBag();
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

      <p className="flex items-start gap-1.5 rounded-md bg-accent/60 px-2.5 py-1.5 text-[11px] font-medium leading-tight text-muted-foreground">
        <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        FabricDNA scores are AI-distilled from verified buyer reviews.
      </p>

      {dna.purchaseComparison && (
        <div className="rounded-lg border border-primary/25 bg-primary/5 p-3">
          <div className="flex items-start gap-3">
            <div className="relative flex h-16 w-20 shrink-0">
              <img
                src={dna.purchaseComparison.previousProductImage}
                alt="Previous purchase"
                className="absolute left-0 top-0 h-16 w-12 rounded-md border-2 border-card object-cover shadow-sm"
              />
              <img
                src={coverImage}
                alt="Current item"
                className="absolute left-7 top-0 z-10 h-16 w-12 rounded-md border-2 border-card object-cover shadow-sm"
              />
            </div>
            <div className="flex-1">
              <p className="flex items-center gap-1.5 text-[12px] font-bold leading-tight text-foreground">
                <Scale className="h-3.5 w-3.5 shrink-0 text-primary" />
                Compared to your {dna.purchaseComparison.previousProduct}
              </p>
              <p className="mt-1.5 text-[12px] leading-tight text-muted-foreground">
                {dna.purchaseComparison.text}
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-[13px] font-bold text-foreground">
          Studio Proof{" "}
          <span className="font-normal text-muted-foreground">(Real fits)</span>
        </p>
        <button
          onClick={() => setShowReel(true)}
          className="relative flex w-full items-center gap-3 overflow-hidden rounded-xl border border-border bg-card transition-transform active:scale-[0.98]"
          aria-label="Open Studio Proof photo feed"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden">
            <img
              src={photos[0]}
              alt="Studio Proof preview"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/35">
              <Images className="h-6 w-6 text-card" />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start text-left">
            <span className="text-[13px] font-bold text-foreground">
              {photos.length} real-fit photos
            </span>
            <span className="text-[12px] text-muted-foreground">
              Tap to view as a vertical feed
            </span>
          </div>
          <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Images className="h-[18px] w-[18px] text-primary-foreground" />
          </div>
        </button>
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

      {showReel && (
        <div
          className="animate-fade-in fixed inset-0 z-50 bg-black"
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            onClick={() => setShowReel(false)}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="no-scrollbar flex h-full w-full snap-y snap-mandatory flex-col overflow-y-auto scroll-smooth">
            {photos.map((url, i) => (
              <div
                key={i}
                className="relative flex h-full w-full shrink-0 snap-start snap-always items-center justify-center"
              >
                <img
                  src={url}
                  alt={`Verified user photo ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/70 to-transparent px-4 pb-6 pt-10">
                  <BadgeCheck className="h-4 w-4 text-success" />
                  <span className="text-[13px] font-semibold text-white">
                    Verified user photo · {i + 1}/{photos.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
