import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Compass,
  Grid2x2,
  Home,
  LayoutGrid,
  ListFilter,
  PackageX,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import {
  getFabricDna,
  getProduct,
  wishlistItems,
  type Product,
} from "@/data/wishlist";
import { WishlistCard } from "@/components/WishlistCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FabricDNA Wishlist — Verified Fabric Scores & Real Fits" },
      {
        name: "description",
        content:
          "Verify saved items with FabricDNA: AI Fabric Truth Score, unedited Studio Proof photos, and the Working-Pro Guarantee with 7-10 PM return pickups.",
      },
      { property: "og:title", content: "FabricDNA Wishlist — Verified Fabric Scores" },
      {
        property: "og:description",
        content:
          "Turn saved items into confident buys with AI fabric validation, real creator photos, and after-hours returns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Wishlist,
});

const collections: { label: string; category: Product["category"] }[] = [
  { label: "Shirts", category: "Shirts" },
  { label: "Tshirts", category: "Tshirts" },
  { label: "Jackets", category: "Jackets" },
];

function Wishlist() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bag, setBag] = useState(0);

  const items = wishlistItems
    .map((w) => ({ item: w, product: getProduct(w.productId)!, dna: getFabricDna(w.productId) }))
    .filter((r) => r.product);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-20 font-sans">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <button
          onClick={() => setExpandedId(null)}
          aria-label="Back to wishlist"
          className="flex items-center"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-[19px] font-bold leading-tight text-foreground">Wishlist</h1>
          <p className="text-[13px] text-muted-foreground">{items.length} items</p>
        </div>
        <ListFilter className="h-5 w-5 text-foreground" />
        <div className="relative">
          <ShoppingBag className="h-5 w-5 text-foreground" />
          {bag > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {bag}
            </span>
          )}
        </div>
      </header>

      <div className="flex gap-3 px-4 py-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-card py-2.5 text-[14px] font-semibold text-foreground">
          <LayoutGrid className="h-4 w-4" /> Collections
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-card py-2.5 text-[14px] font-semibold text-foreground">
          <PackageX className="h-4 w-4" /> Out of Stock
        </button>
      </div>

      <div className="flex gap-5 px-4 pb-3">
        {collections.map((c) => {
          const cover = items.find((i) => i.product.category === c.category)?.product;
          return (
            <div key={c.label} className="w-16 text-center">
              <div className="h-16 w-16 overflow-hidden rounded-xl bg-muted">
                {cover && (
                  <img
                    src={cover.imageUrl}
                    alt={c.label}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
              <p className="mt-1 text-[12px] text-foreground">{c.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 px-4">
        {items.map(({ item, product, dna }) => (
          <WishlistCard
            key={item.id}
            product={product}
            dna={dna}
            expanded={expandedId === product.id}
            onToggle={() => setExpandedId(expandedId === product.id ? null : product.id)}
            onMoveToBag={() => setBag((b) => b + 1)}
          />
        ))}
      </div>


      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md justify-around border-t border-border bg-card py-2">
        {[
          { icon: Home, label: "Home" },
          { icon: Grid2x2, label: "Categories" },
          { icon: Sparkles, label: "Studio" },
          { icon: Search, label: "Explore" },
          { icon: ShoppingBag, label: "Bag", active: true },
        ].map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`flex w-16 flex-col items-center gap-0.5 text-[11px] ${
              active ? "text-primary" : "text-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </div>
        ))}
      </nav>
      <Compass className="hidden" />
    </div>
  );
}
