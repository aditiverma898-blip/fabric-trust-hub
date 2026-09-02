import { ChevronDown, Share2, ShoppingBag, Sparkles, Star, Trash2 } from "lucide-react";
import type { FabricDNA, Product } from "@/data/wishlist";
import { FabricDnaBadge, FabricDnaPanel } from "./FabricDnaPanel";
import { useShop } from "@/context/ShopContext";

function Price({ product }: { product: Product }) {
  return (
    <p className="mt-1 flex items-center gap-1.5 text-[14px]">
      <span className="font-bold text-foreground">₹{product.price}</span>
      {product.discountPercent ? (
        <span className="font-semibold text-success">{product.discountPercent}% OFF</span>
      ) : null}
      {product.mrp ? (
        <span className="text-[12px] text-muted-foreground line-through">₹{product.mrp}</span>
      ) : null}
    </p>
  );
}

function RowActions({ product }: { product: Product }) {
  const { removeFromWishlist, showToast } = useShop();

  const handleShare = async () => {
    const url = `https://www.myntra.com/p/${product.id}`;
    const data = {
      title: "Checkout what I found on Myntra!",
      text: `${product.brand} ${product.name}`,
      url,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        return; // user dismissed the native sheet
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast({ message: "Link Copied", variant: "dark" });
    } catch {
      showToast({ message: "Could not copy link", variant: "dark" });
    }
  };

  return (
    <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
      <button
        aria-label={`Remove ${product.name}`}
        onClick={() => removeFromWishlist(product.id, `${product.brand} ${product.name}`)}
        className="flex justify-center py-2.5"
      >
        <Trash2 className="h-[18px] w-[18px] text-foreground" />
      </button>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent("open-size-drawer", { detail: product.id }))}
        className="flex items-center justify-center gap-1.5 py-2.5 text-[14px] font-bold text-primary"
      >
        <ShoppingBag className="h-[18px] w-[18px]" /> Add
      </button>
      <button aria-label={`Share ${product.name}`} onClick={handleShare} className="flex justify-center py-2.5">
        <Share2 className="h-[18px] w-[18px] text-foreground" />
      </button>
    </div>
  );
}

export function WishlistCard({
  product,
  dna,
  expanded,
  onToggle,
  onMoveToBag,
}: {
  product: Product;
  dna?: FabricDNA | undefined;
  expanded: boolean;
  onToggle: () => void;
  onMoveToBag: () => void;
}) {
  if (expanded && dna) {
    return (
      <div className="col-span-2 overflow-hidden rounded-xl border border-primary/20 bg-card shadow-sm">
        <div className="relative">
          <FabricDnaBadge />
          <img
            src={product.imageUrl}
            alt={product.name}
            width={768}
            height={1024}
            className="h-64 w-full object-cover object-top"
          />
        </div>
        <div className="px-3 pb-3 pt-2.5">
          <p className="text-[14px] font-bold text-foreground">{product.brand}</p>
          <p className="truncate text-[13px] text-muted-foreground">{product.name}</p>
          <Price product={product} />
        </div>
        <FabricDnaPanel dna={dna} onMoveToBag={onMoveToBag} />
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-1 border-t border-border py-2 text-[12px] font-semibold text-muted-foreground"
        >
          Hide FabricDNA <ChevronDown className="h-4 w-4 rotate-180" />
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          width={768}
          height={1024}
          loading="lazy"
          className="h-56 w-full object-cover object-top"
        />
        {product.rating ? (
          <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-card px-1.5 py-0.5 text-[12px] font-semibold text-foreground shadow-sm">
            {product.rating} <Star className="h-3 w-3 fill-success text-success" />
          </span>
        ) : null}
      </div>
      <div className="px-2.5 pb-2 pt-2">
        <p className="text-[14px] font-bold text-foreground">{product.brand}</p>
        <p className="truncate text-[13px] text-muted-foreground">{product.name}</p>
        <Price product={product} />
      </div>
      {dna ? (
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-1.5 border-t border-border bg-accent py-2 text-[12px] font-bold text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Verify with FabricDNA
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      ) : null}
      <RowActions product={product} />
    </div>
  );
}
