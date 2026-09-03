import { Drawer } from "vaul";
import { Copy, Link2, Share } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/context/ShopContext";

export function ShareSheet({
  isOpen,
  onClose,
  productName,
  productId,
}: {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
}) {
  const [tab, setTab] = useState<"Personal" | "Work">("Personal");
  const url = `https://www.myntra.com/p/${productId}`;
  const { showToast } = useShop();

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast({ message: "Link Copied", variant: "dark" });
      onClose();
    } catch {
      showToast({ message: "Could not copy link", variant: "dark" });
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-[20px] bg-[#f5f5f5]">
          <div className="flex-1 rounded-t-[20px] bg-[#f5f5f5] p-4 font-sans">
            <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-muted-foreground/20" />
            
            <Drawer.Title className="mb-4 text-[20px] font-medium text-foreground">
              Sharing link
            </Drawer.Title>

            <div className="mb-6 flex gap-3">
              <div className="flex-1 text-[14px]">
                <span className="font-bold text-foreground">Checkout what I found on Myntra!</span>
                <br />
                <span className="break-all text-muted-foreground">{url}</span>
              </div>
              <button 
                onClick={copyUrl}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-black/5"
                aria-label="Copy to clipboard"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>

            <button className="mx-auto mb-6 flex items-center justify-center gap-2 rounded-full px-6 py-2 text-[14px] font-medium text-foreground transition-colors hover:bg-black/5">
              <Link2 className="h-4 w-4" /> File share
            </button>

            <div className="mb-6 flex rounded-full bg-black/5 p-1">
              <button
                onClick={() => setTab("Personal")}
                className={`flex-1 rounded-full py-2.5 text-[14px] font-medium transition-colors ${
                  tab === "Personal" ? "bg-[#b35e12] text-white shadow-sm" : "text-foreground"
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setTab("Work")}
                className={`flex-1 rounded-full py-2.5 text-[14px] font-medium transition-colors ${
                  tab === "Work" ? "bg-white text-foreground shadow-sm" : "text-foreground"
                }`}
              >
                Work
              </button>
            </div>

            <div className="flex justify-between overflow-x-auto pb-4">
              <AppIcon name="Quick Share" color="bg-blue-600" />
              <AppIcon name="WhatsApp" color="bg-green-500" />
              <AppIcon name="Gemini" color="bg-purple-500" />
              <AppIcon name="LinkedIn" color="bg-blue-700" />
              <AppIcon name="Gmail" color="bg-red-500" />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function AppIcon({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex w-16 flex-col items-center gap-2">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
        <Share className="h-6 w-6 text-white" />
      </div>
      <span className="text-center text-[12px] text-muted-foreground">{name}</span>
    </div>
  );
}
