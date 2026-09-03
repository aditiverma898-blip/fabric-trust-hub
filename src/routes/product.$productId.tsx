import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronDown, Heart, Share2, ShoppingBag, Sparkles } from "lucide-react";
import { getFabricDna, getProduct } from "@/data/wishlist";
import { FabricDnaPanel } from "@/components/FabricDnaPanel";
import { SizeDrawer } from "@/components/SizeDrawer";
import { useShop } from "@/context/ShopContext";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.brand} ${product.name} — FabricDNA Verified`;
    const description = `${product.brand} ${product.name} at ₹${product.price}. See the AI Fabric Truth Score and real-fit Studio Proof photos before you buy.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetails,
});

function ProductDetails() {
  const { product } = Route.useLoaderData();
  const dna = getFabricDna(product.id);
  const [showDna, setShowDna] = useState(false);
  const { bag, addToBag, openSizeDrawer, sizeDrawerProductId, closeSizeDrawer, showToast } =
    useShop();

  const bagCount = bag.reduce((n, b) => n + b.qty, 0);
  const drawerProduct = sizeDrawerProductId ? getProduct(sizeDrawerProductId) : undefined;

  const handleShare = async () => {
    const url = `https://www.myntra.com/p/${product.id}`;
    const data = { title: "Checkout what I found on Myntra!", text: `${product.brand} ${product.name}`, url };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        return;
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
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24 font-sans">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <Link to="/" aria-label="Back to wishlist">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </Link>
        <p className="flex-1 truncate text-[15px] font-bold text-foreground">{product.brand}</p>
        <button aria-label="Share product" onClick={handleShare}>
          <Share2 className="h-5 w-5 text-foreground" />
        </button>
        <Link to="/bag" aria-label="Open bag" className="relative">
          <ShoppingBag className="h-5 w-5 text-foreground" />
          {bagCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {bagCount}
            </span>
          )}
        </Link>
      </header>

      <img
        src={product.imageUrl}
        alt={`${product.brand} ${product.name}`}
        className="h-[420px] w-full object-cover object-top"
      />

      <div className="border-b border-border bg-card px-4 pb-3 pt-3">
        <h1 className="text-[17px] font-bold text-foreground">{product.brand}</h1>
        <p className="text-[15px] text-muted-foreground">{product.name}</p>
        <p className="mt-1.5 flex items-center gap-2 text-[17px]">
          <span className="font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
          {product.mrp ? (
            <span className="text-[14px] text-muted-foreground line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          ) : null}
          {product.discountPercent ? (
            <span className="text-[14px] font-bold text-success">{product.discountPercent}% OFF</span>
          ) : null}
        </p>
      </div>

      {dna ? (
        <section className="mt-2 overflow-hidden border-y border-border bg-card">
          <button
            onClick={() => setShowDna((v) => !v)}
            className="flex w-full items-center justify-center gap-1.5 bg-accent py-2.5 text-[13px] font-bold text-primary"
          >
            <Sparkles className="h-4 w-4" />
            {showDna ? "Hide FabricDNA" : "Verify with FabricDNA"}
            <ChevronDown className={`h-4 w-4 transition-transform ${showDna ? "rotate-180" : ""}`} />
          </button>
          {showDna ? (
            <FabricDnaPanel
              dna={dna}
              coverImage={product.imageUrl}
              onMoveToBag={() => addToBag(product.id, product.sizes[1] ?? product.sizes[0]!)}
            />
          ) : null}
        </section>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-md gap-3 border-t border-border bg-card px-4 py-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary py-3 text-[15px] font-bold text-primary">
          <Heart className="h-[18px] w-[18px]" /> Wishlist
        </button>
        <button
          onClick={() => openSizeDrawer(product.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-[15px] font-bold text-primary-foreground"
        >
          <ShoppingBag className="h-[18px] w-[18px]" /> Add to Bag
        </button>
      </div>

      {drawerProduct ? (
        <SizeDrawer
          product={drawerProduct}
          onClose={closeSizeDrawer}
          onAddToBag={(size) => {
            addToBag(drawerProduct.id, size);
            closeSizeDrawer();
          }}
        />
      ) : null}
    </div>
  );
}
