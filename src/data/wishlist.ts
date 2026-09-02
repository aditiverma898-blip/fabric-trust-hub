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
    "1521572163474-6864f9cf17ab",
    "1583743814966-8936f5b7be1a",
    "1618354691373-d851c5c3a990",
    "1622470953794-aa9c70b0fb9d",
    "1503341504253-dff4815485f1",
  ].map(unsplash),
  prd_2: [
    "1596755094514-f87e34085b2c",
    "1594633312681-425c7b97ccd1",
    "1489987707025-afc232f7ea0f",
    "1602810318383-e386cc2a3ccf",
    "1525507119028-ed4c629a60a3",
  ].map(unsplash),
  prd_3: [
    "1551028719-00167b16eac5",
    "1520975954732-35dd22299614",
    "1543076447-215ad9ba6923",
    "1483985988355-763728e1935b",
    "1495121605193-b116b5b9c5fe",
  ].map(unsplash),
  prd_4: [
    "1516257984-b1b4d707412e",
    "1507003211169-0a1dd7228f2d",
    "1490114538077-0a7f8cb49891",
    "1524758631624-e2822e304c36",
    "1479064555552-3ef4979f8908",
  ].map(unsplash),
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
