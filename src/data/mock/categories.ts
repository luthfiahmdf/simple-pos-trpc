export interface Category {
  id: string;
  name: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { id: "all", name: "All", count: 48 },
  { id: "drinks", name: "Drinks", count: 15 },
  { id: "snacks", name: "Snacks", count: 12 },
  { id: "bakery", name: "Bakery", count: 8 },
  { id: "desserts", name: "Desserts", count: 13 },
  { id: "fast-food", name: "Fast Food", count: 10 },
  { id: "meals", name: "Meals", count: 7 },
  { id: "groceries", name: "Groceries", count: 20 },
  { id: "breakfast", name: "Breakfast", count: 5 },
  { id: "lunch", name: "Lunch", count: 9 },
]; 