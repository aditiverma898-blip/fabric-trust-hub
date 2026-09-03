import p1 from "@/assets/p1-polo.jpg";
import p2 from "@/assets/p2-shirt.jpg";
import p3 from "@/assets/p3-jacket.jpg";
import p4 from "@/assets/p4-black-shirt.jpg";

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  mrp?: number;
  discountPercent?: number;
  rating?: number;
  imageUrl: string;
  category: "Shirts" | "Tshirts" | "Jackets";
  inStock: boolean;
  sizes: string[];
  seller: string;
  deliveryWindow: string;
};

/** Matches the FabricDNA entity in the spec's data model. */
export type FabricDNA = {
  id: string;
  productId: string;
  /** 0-100 */
  truthScore: number;
  /** unedited creator photos shown in the vertical Studio Proof feed */
  studioImageUrls: string[];
  workingProGuaranteeEligible: boolean;
  /** display-only blurb for the score */
  fabricSummary?: string;
  studioPhotoCount?: number;
  /** per-product fabric metrics, 0-100 */
  fabricStats?: { label: string; value: number }[];
  /** comparison with a past purchase */
  purchaseComparison?: {
    previousProduct: string;
    text: string;
    previousProductImage: string;
  };
};

export type WishlistItem = {
  id: string;
  userId: string;
  productId: string;
};

export type BagItem = {
  id: string;
  productId: string;
  size: string;
  qty: number;
  selected: boolean;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    id: "prd_1",
    brand: "Mast & Harbour",
    name: "Mast & Harbour Men Navy Blue Polo",
    price: 1114,
    mrp: 1299,
    discountPercent: 14,
    imageUrl: p1,
    category: "Tshirts",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    seller: "DAFFODIL",
    deliveryWindow: "8 Sep - 10 Sep",
  },
  {
    id: "prd_2",
    brand: "RARE RABBIT",
    name: "Men Checked Shirt",
    price: 1999,
    mrp: 3999,
    discountPercent: 50,
    rating: 4.4,
    imageUrl: p2,
    category: "Shirts",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    seller: "RARE RABBIT RETAIL",
    deliveryWindow: "7 Sep - 9 Sep",
  },
  {
    id: "prd_3",
    brand: "Roadster",
    name: "Men Olive Denim Jacket",
    price: 1599,
    imageUrl: p3,
    category: "Jackets",
    inStock: true,
    sizes: ["M", "L", "XL"],
    seller: "OMNITECH RETAIL",
    deliveryWindow: "9 Sep - 12 Sep",
  },
  {
    id: "prd_4",
    brand: "Blackberrys",
    name: "Men Slim Fit Black Shirt",
    price: 1299,
    mrp: 1624,
    discountPercent: 20,
    imageUrl: p4,
    category: "Shirts",
    inStock: true,
    sizes: ["S", "M", "L"],
    seller: "BLACKBERRYS MENSWEAR",
    deliveryWindow: "8 Sep - 11 Sep",
  },
];

export const wishlistItems: WishlistItem[] = products.map((p, i) => ({
  id: `wl_${i + 1}`,
  userId: "usr_1",
  productId: p.id,
}));

/** Every product gets its own unique set of 5 real-fit photos. */
const studioPhotoSets: Record<string, string[]> = {
  prd_1: [
    "/navy_polo_3.jpg",
    "/navy_polo_1.jpg",
    "/navy_polo_4.jpg",
    "/navy_polo_2.jpg",
    "/navy_polo_5.jpg",
  ],
  prd_2: [
    "/checked_shirt_3.jpg",
    "/checked_shirt_1.jpg",
    "/checked_shirt_4.jpg",
    "/checked_shirt_2.jpg",
    "/checked_shirt_5.jpg",
  ],
  prd_3: [
    "/olive_jacket_3.jpg",
    "/olive_jacket_1.jpg",
    "/olive_jacket_4.jpg",
    "/olive_jacket_2.jpg",
    "/olive_jacket_5.jpg",
  ],
  prd_4: [
    "/black_shirt_3.jpg",
    "/black_shirt_1.jpg",
    "/black_shirt_4.jpg",
    "/black_shirt_2.jpg",
    "/black_shirt_3.jpg",
  ],
};

export const fabricDnaRecords: FabricDNA[] = [
  {
    id: "fdna_1",
    productId: "prd_1",
    truthScore: 92,
    studioImageUrls: studioPhotoSets["prd_1"]!,
    workingProGuaranteeEligible: true,
    fabricSummary: "AI Verified Cotton Blend",
    studioPhotoCount: 12,
    fabricStats: [
      { label: "Breathability", value: 92 },
      { label: "Softness", value: 88 },
      { label: "Durability", value: 76 },
    ],
    purchaseComparison: {
      previousProduct: "H&M Cotton Polo (May '25)",
      text: "This fabric is 15% softer but slightly less breathable. It will look great paired with the white trousers you bought in July 2024.",
      previousProductImage: "https://picsum.photos/seed/polo/200/300",
    },
  },
  {
    id: "fdna_2",
    productId: "prd_2",
    truthScore: 87,
    studioImageUrls: studioPhotoSets["prd_2"]!,
    workingProGuaranteeEligible: true,
    fabricSummary: "AI Verified Cotton Twill",
    studioPhotoCount: 8,
    fabricStats: [
      { label: "Breathability", value: 81 },
      { label: "Softness", value: 84 },
      { label: "Durability", value: 90 },
    ],
    purchaseComparison: {
      previousProduct: "Highlander Casual Shirt (Dec '24)",
      text: "This cotton twill is noticeably heavier and more durable. This pattern perfectly complements the black denim jeans you bought last winter.",
      previousProductImage: "https://picsum.photos/seed/shirt2/200/300",
    },
  },
  {
    id: "fdna_3",
    productId: "prd_3",
    truthScore: 78,
    studioImageUrls: studioPhotoSets["prd_3"]!,
    workingProGuaranteeEligible: false,
    fabricSummary: "AI Verified Heavy Denim",
    studioPhotoCount: 5,
    fabricStats: [
      { label: "Breathability", value: 64 },
      { label: "Softness", value: 58 },
      { label: "Durability", value: 96 },
    ],
    purchaseComparison: {
      previousProduct: "Levi's Trucker Jacket (Aug '24)",
      text: "This denim is roughly 20% thicker and stiffer. It is the perfect layering piece over your white essential t-shirt.",
      previousProductImage: "https://picsum.photos/seed/jacket2/200/300",
    },
  },
  {
    id: "fdna_4",
    productId: "prd_4",
    truthScore: 84,
    studioImageUrls: studioPhotoSets["prd_4"]!,
    workingProGuaranteeEligible: true,
    fabricSummary: "AI Verified Poly-Cotton",
    studioPhotoCount: 9,
    fabricStats: [
      { label: "Breathability", value: 74 },
      { label: "Softness", value: 90 },
      { label: "Durability", value: 82 },
    ],
    purchaseComparison: {
      previousProduct: "Peter England Formal (Oct '25)",
      text: "This fabric has significantly more stretch and give. This sharp black shirt pairs seamlessly with the grey chinos you bought last month.",
      previousProductImage: "https://picsum.photos/seed/shirt3/200/300",
    },
  },
];

/** "You May Also Like" rail in the Bag screen. */
export const recommendations = [
  {
    id: "rec_1",
    label: "Sunglasses",
    name: "Polarized Wayfarer",
    price: 899,
    imageUrl: unsplash("1511499767150-a48a237f0083"),
  },
  {
    id: "rec_2",
    label: "Water Bottle",
    name: "Steel Sipper 750ml",
    price: 649,
    imageUrl: unsplash("1602143407151-7111542de6e8"),
  },
  {
    id: "rec_3",
    label: "Watches",
    name: "Minimal Analog Watch",
    price: 2499,
    imageUrl: unsplash("1524805444758-089113d48a6d"),
  },
];

export const getProduct = (productId: string) =>
  products.find((p) => p.id === productId);

export const getFabricDna = (productId: string) =>
  fabricDnaRecords.find((f) => f.productId === productId);
