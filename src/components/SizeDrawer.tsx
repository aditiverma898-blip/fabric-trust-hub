import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/data/wishlist";

export function SizeDrawer({
  product,
  onClose,
  onAddToBag,
}: {
  product: Product;
  onClose: () => void;
  onAddToBag: (size: string) => void;
}) {
  const [size, setSize] = useState<string>(product.sizes[1] ?? product.sizes[0]!);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true">
      <button
        aria-label="Close size selector"
        onClick={onClose}
        className="animate-fade-in absolute inset-0 bg-foreground/50"
      />
      <div className="relative w-full max-w-md rounded-t-3xl bg-card px-5 pb-6 pt-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-bold text-foreground">Sizes : {size}</p>
          <button className="flex items-center gap-0.5 text-[16px] font-bold text-primary">
            Size Chart <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex gap-3">
          {product.sizes.map((s) => {
            const active = s === size;
            return (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={active}
                className={`flex h-14 w-14 items-center justify-center rounded-xl border text-[16px] font-bold transition-colors ${
                  active
                    ? "border-2 border-ring bg-foreground text-card"
                    : "border-border bg-card text-foreground"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-2 text-[18px]">
          {product.mrp ? (
            <span className="font-bold text-muted-foreground line-through">₹{product.mrp}</span>
          ) : null}
          <span className="font-bold text-foreground">₹{product.price}</span>
          {product.discountPercent ? (
            <span className="font-bold text-[#F5820D]">{product.discountPercent}% OFF</span>
          ) : null}
        </div>
        <p className="mt-1 text-[15px] text-foreground">
          Seller: <span className="font-bold text-primary">{product.seller}</span>
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border bg-card py-3.5 text-[16px] font-bold text-foreground"
          >
            Buy Now
          </button>
          <button
            onClick={() => onAddToBag(size)}
            className="flex-1 rounded-lg bg-primary py-3.5 text-[16px] font-bold text-primary-foreground active:bg-primary/90"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
