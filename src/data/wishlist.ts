import p1 from "@/assets/p1-polo.jpg";
import p2 from "@/assets/p2-shirt.jpg";
import p3 from "@/assets/p3-jacket.jpg";
import p4 from "@/assets/p4-black-shirt.jpg";
import s1 from "@/assets/s1.jpg";
import s2 from "@/assets/s2.jpg";
import s3 from "@/assets/s3.jpg";

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
};

/** Matches the FabricDNA entity in the spec's data model. */
export type FabricDNA = {
  id: string;
  productId: string;
  /** 0-100 */
  truthScore: number;
  /** exactly 3 unedited creator photos */
  studioImageUrls: [string, string, string];
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
  },
  {
    id: "prd_3",
    brand: "Roadster",
    name: "Men Olive Denim Jacket",
    price: 1599,
    imageUrl: p3,
    category: "Jackets",
    inStock: true,
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
  },
];

export const wishlistItems: WishlistItem[] = products.map((p, i) => ({
  id: `wl_${i + 1}`,
  userId: "usr_1",
  productId: p.id,
}));

export const fabricDnaRecords: FabricDNA[] = [
  {
    id: "fdna_1",
    productId: "prd_1",
    truthScore: 92,
    studioImageUrls: [s1, s2, s3],
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
    studioImageUrls: [s2, s3, s1],
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
    studioImageUrls: [s3, s1, s2],
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
    studioImageUrls: [s1, s3, s2],
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

export const getProduct = (productId: string) =>
  products.find((p) => p.id === productId);

export const getFabricDna = (productId: string) =>
  fabricDnaRecords.find((f) => f.productId === productId);
