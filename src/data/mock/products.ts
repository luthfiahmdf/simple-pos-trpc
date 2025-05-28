export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Nasi Goreng",
    price: 25000,
    category: "meals",
    image: "https://placehold.co/600x400",
  },
  {
    id: "2",
    name: "Es Teh Manis",
    price: 5000,
    category: "drinks",
    image: "https://placehold.co/600x400",
  },
  {
    id: "3",
    name: "Roti Bakar",
    price: 15000,
    category: "bakery",
    image: "https://placehold.co/200x400",
  },
  {
    id: "4",
    name: "Sate Ayam",
    price: 30000,
    category: "meals",
    image: "https://placehold.co/600x400",
  },
  {
    id: "5",
    name: "Martabak Manis",
    price: 35000,
    category: "desserts",
    image: "https://placehold.co/400",
  },
  {
    id: "6",
    name: "Kopi Hitam",
    price: 8000,
    category: "drinks",
    image: "https://placehold.co/600x400",
  },
  {
    id: "7",
    name: "Pisang Goreng",
    price: 10000,
    category: "snacks",
    image: "https://placehold.co/600x400",
  },
  {
    id: "8",
    name: "Mie Ayam",
    price: 20000,
    category: "meals",
    image: "https://placehold.co/600x400",
  },
  {
    id: "9",
    name: "Batagor",
    price: 18000,
    category: "snacks",
    image: "https://placehold.co/600x400",
  },
  {
    id: "10",
    name: "Es Jeruk",
    price: 7000,
    category: "drinks",
    image: "https://placehold.co/600x400",
  },
  {
    id: "11",
    name: "Bakso",
    price: 23000,
    category: "meals",
    image: "https://placehold.co/600x400",
  },
  {
    id: "12",
    name: "Martabak Telur",
    price: 28000,
    category: "fast-food",
    image: "https://placehold.co/600x400",
  },
];
