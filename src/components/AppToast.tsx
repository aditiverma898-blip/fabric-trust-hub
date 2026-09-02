import { useShop } from "@/context/ShopContext";

export function AppToast() {
  const { toast } = useShop();
  if (!toast) return null;

  const base =
    "pointer-events-auto mx-auto flex w-full max-w-md items-center justify-between gap-3 px-4 py-3.5 text-[15px] font-bold";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-14 z-[60] mx-auto flex max-w-md justify-center px-3">
      {toast.variant === "success" ? (
        <div key={toast.id} className={`${base} animate-fade-in bg-success text-white`}>
          <span>{toast.message}</span>
        </div>
      ) : (
        <div
          key={toast.id}
          className={`${base} animate-fade-in rounded-xl bg-foreground text-white shadow-lg`}
        >
          <span className="truncate">{toast.message}</span>
          {toast.actionLabel ? (
            <button
              onClick={toast.onAction}
              className="shrink-0 text-[15px] font-bold text-primary"
            >
              {toast.actionLabel}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
