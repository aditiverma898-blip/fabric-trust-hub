import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  wishlistItems as initialWishlist,
  type BagItem,
  type WishlistItem,
} from "@/data/wishlist";

export type ToastState = {
  id: number;
  message: string;
  variant: "success" | "dark" | "neutral";
  actionLabel?: string;
  onAction?: () => void;
};

type ShopContextValue = {
  wishlist: WishlistItem[];
  bag: BagItem[];
  toast: ToastState | null;
  showToast: (t: Omit<ToastState, "id">) => void;
  dismissToast: () => void;
  addToBag: (productId: string, size: string) => void;
  removeFromBag: (bagItemId: string) => void;
  updateBagItem: (bagItemId: string, patch: Partial<BagItem>) => void;
  removeFromWishlist: (productId: string, itemName: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissToast = useCallback(() => setToast(null), []);

  const showToast = useCallback((t: Omit<ToastState, "id">) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ ...t, id: Date.now() });
    timer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  const addToBag = useCallback(
    (productId: string, size: string) => {
      setBag((prev) => {
        const existing = prev.find((b) => b.productId === productId && b.size === size);
        if (existing) {
          return prev.map((b) =>
            b.id === existing.id ? { ...b, qty: b.qty + 1 } : b,
          );
        }
        return [
          ...prev,
          {
            id: `bag_${productId}_${size}_${Date.now()}`,
            productId,
            size,
            qty: 1,
            selected: true,
          },
        ];
      });
      showToast({ message: "Successfully moved item to bag", variant: "success" });
    },
    [showToast],
  );

  const removeFromBag = useCallback((bagItemId: string) => {
    setBag((prev) => prev.filter((b) => b.id !== bagItemId));
  }, []);

  const updateBagItem = useCallback((bagItemId: string, patch: Partial<BagItem>) => {
    setBag((prev) => prev.map((b) => (b.id === bagItemId ? { ...b, ...patch } : b)));
  }, []);

  const removeFromWishlist = useCallback(
    (productId: string, itemName: string) => {
      let removed: { item: WishlistItem; index: number } | null = null;
      setWishlist((prev) => {
        const index = prev.findIndex((w) => w.productId === productId);
        if (index === -1) return prev;
        removed = { item: prev[index]!, index };
        return prev.filter((_, i) => i !== index);
      });
      showToast({
        message: `Removed ${itemName}`,
        variant: "dark",
        actionLabel: "Undo",
        onAction: () => {
          if (!removed) return;
          const { item, index } = removed;
          setWishlist((prev) => {
            if (prev.some((w) => w.id === item.id)) return prev;
            const next = [...prev];
            next.splice(index, 0, item);
            return next;
          });
          setToast(null);
        },
      });
    },
    [showToast],
  );

  const value = useMemo(
    () => ({
      wishlist,
      bag,
      toast,
      showToast,
      dismissToast,
      addToBag,
      removeFromBag,
      updateBagItem,
      removeFromWishlist,
    }),
    [
      wishlist,
      bag,
      toast,
      showToast,
      dismissToast,
      addToBag,
      removeFromBag,
      updateBagItem,
      removeFromWishlist,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
