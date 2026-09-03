import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Heart, HeartOff, Info, Share2, Trash2, Truck, Undo2, X, ArrowLeft } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { getProduct, recommendations } from "@/data/wishlist";

export const Route = createFileRoute("/bag")({
  head: () => ({
    meta: [
      { title: "Your Bag — FabricDNA Verified Checkout" },
      {
        name: "description",
        content:
          "Review your bag: sizes, quantities, price breakdown, delivery windows and FabricDNA-verified picks before you place your order.",
      },
      { property: "og:title", content: "Your Bag — FabricDNA Verified Checkout" },
      {
        property: "og:description",
        content: "Review sizes, quantities and delivery dates, then place your order.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BagScreen,
});

function BagScreen() {
  const { bag, removeFromBag, updateBagItem, showToast } = useShop();

  const rows = bag
    .map((b) => ({ bagItem: b, product: getProduct(b.productId) }))
    .filter((r) => r.product);

  const selected = rows.filter((r) => r.bagItem.selected);
  const total = selected.reduce(
    (sum, r) => sum + r.product!.price * r.bagItem.qty,
    0,
  );

  return (
    <div className="mx-auto min-h-screen max-w-md bg-muted pb-28 font-sans">
      <header className="sticky top-0 z-20 bg-card px-4 pb-0 pt-3">
        <div className="flex items-start gap-3">
          <Link to="/" aria-label="Back to wishlist" className="mt-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Link>
          <div className="flex-1">
            <p className="flex items-center gap-1 text-[17px] font-bold text-foreground">
              Select Delivery Address <ChevronDown className="h-4 w-4" />
            </p>
            <p className="truncate text-[15px] text-muted-foreground">
              Add an address to see delivery options
            </p>
          </div>
          <Heart className="mt-1 h-5 w-5 text-foreground" />
        </div>
        <div className="mt-3 flex gap-6 border-b border-border">
          <span className="rounded-t-full border border-primary px-4 py-1 text-[14px] font-bold text-primary">
            Items
          </span>
          <span className="py-1 text-[14px] text-muted-foreground">Coupons & Bank Offers</span>
          <span className="py-1 text-[14px] text-muted-foreground">Price Details</span>
        </div>
      </header>

      <section className="px-4 pt-4">
        <h1 className="text-[22px] font-bold text-muted-foreground">Your Bag</h1>

        <div className="mt-3 flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-primary text-[12px] font-bold text-primary-foreground">
            ✓
          </span>
          <p className="flex-1 text-[15px] font-bold text-foreground">
            {selected.length}/{rows.length} Items Selected{" "}
            <span className="text-primary">(₹{total.toLocaleString("en-IN")})</span>
          </p>
          <Share2 className="h-[18px] w-[18px] text-foreground" />
          <Trash2 className="h-[18px] w-[18px] text-foreground" />
          <HeartOff className="h-[18px] w-[18px] text-foreground" />
        </div>

        {rows.length === 0 ? (
          <div className="mt-8 rounded-xl bg-card px-4 py-10 text-center">
            <p className="text-[15px] font-bold text-foreground">Your bag is empty</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Add items from your wishlist to see them here.
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-[14px] font-bold text-primary-foreground"
            >
              Go to Wishlist
            </Link>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {rows.map(({ bagItem, product }) => (
              <div key={bagItem.id} className="relative rounded-xl bg-card p-3">
                <button
                  aria-label={`Remove ${product!.name} from bag`}
                  onClick={() => removeFromBag(bagItem.id)}
                  className="absolute right-3 top-3"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
                <div className="flex gap-3">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={product!.imageUrl}
                      alt={product!.name}
                      className="h-full w-full object-cover object-top"
                    />
                    <button
                      aria-label="Toggle selection"
                      onClick={() =>
                        updateBagItem(bagItem.id, { selected: !bagItem.selected })
                      }
                      className={`absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded text-[12px] font-bold ${
                        bagItem.selected
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-transparent"
                      }`}
                    >
                      ✓
                    </button>
                  </div>
                  <div className="min-w-0 flex-1 pr-6">
                    <p className="text-[17px] font-bold text-foreground">{product!.brand}</p>
                    <p className="truncate text-[15px] text-muted-foreground">{product!.name}</p>
                    <div className="mt-2 flex gap-2">
                      <label className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-[13px] font-semibold text-foreground">
                        Size:
                        <select
                          aria-label="Size"
                          value={bagItem.size}
                          onChange={(e) => updateBagItem(bagItem.id, { size: e.target.value })}
                          className="bg-transparent font-bold outline-none"
                        >
                          {product!.sizes.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-[13px] font-semibold text-foreground">
                        Qty:
                        <select
                          aria-label="Quantity"
                          value={bagItem.qty}
                          onChange={(e) =>
                            updateBagItem(bagItem.id, { qty: Number(e.target.value) })
                          }
                          className="bg-transparent font-bold outline-none"
                        >
                          {[1, 2, 3, 4, 5].map((q) => (
                            <option key={q} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-[15px]">
                      <span className="font-bold text-foreground">
                        ₹{(product!.price * bagItem.qty).toLocaleString("en-IN")}
                      </span>
                      {product!.mrp ? (
                        <span className="text-muted-foreground line-through">
                          ₹{(product!.mrp * bagItem.qty).toLocaleString("en-IN")}
                        </span>
                      ) : null}
                      {product!.mrp ? (
                        <span className="font-bold text-[#F5820D]">
                          ₹{((product!.mrp - product!.price) * bagItem.qty).toLocaleString("en-IN")} Off
                        </span>
                      ) : null}
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-[14px] text-foreground">
                      <Undo2 className="h-4 w-4" /> 7 days return
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 text-[14px] text-foreground">
                      <Truck className="h-4 w-4 shrink-0" /> Delivery between{" "}
                      {product!.deliveryWindow}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6 px-4">
        <h2 className="text-[22px] font-bold text-muted-foreground">You May Also Like</h2>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
          <span className="shrink-0 rounded-full border border-primary px-5 py-2 text-[15px] font-bold text-primary">
            All
          </span>
          {recommendations.map((r) => (
            <span
              key={r.id}
              className="shrink-0 rounded-full border border-border bg-card px-5 py-2 text-[15px] font-bold text-foreground"
            >
              {r.label}
            </span>
          ))}
        </div>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-2">
          {recommendations.map((r) => (
            <div key={r.id} className="w-40 shrink-0 overflow-hidden rounded-xl bg-card">
              <img
                src={r.imageUrl}
                alt={r.name}
                loading="lazy"
                className="h-40 w-full object-cover"
              />
              <div className="px-2.5 py-2">
                <p className="truncate text-[13px] font-bold text-foreground">{r.name}</p>
                <p className="text-[13px] text-muted-foreground">₹{r.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md bg-card">
        <p className="bg-accent py-2.5 text-center text-[15px] font-semibold text-foreground">
          {selected.length} Item{selected.length === 1 ? "" : "s"} selected for order
        </p>
        <div className="px-4 pb-4 pt-3">
          <button
            disabled={selected.length === 0}
            onClick={() =>
              showToast({ message: "Order placed successfully", variant: "success" })
            }
            className="w-full rounded-lg bg-primary py-3.5 text-[17px] font-bold text-primary-foreground disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
