
import { Product, User, UserRole } from './types';

const generateCategoryProducts = (category: string, count: number, startId: number, basePrice: number, vendorId: string): Product[] => {
  return Array.from({ length: count }).map((_, i) => {
    const id = (startId + i).toString();
    const price = basePrice + (Math.random() * basePrice * 0.8);
    const rating = 4 + (Math.random() * 0.9);
    const reviews = Math.floor(Math.random() * 800) + 20;
    
    return {
      id,
      name: `${category} Premium ${['Ultra', 'Pro', 'Elite', 'Max', 'Z'][i % 5]} #${i + 1}`,
      description: `High-end ${category.toLowerCase()} solution engineered for those who demand the best in quality, durability, and style. Proven performance in every condition.`,
      price: parseFloat(price.toFixed(2)),
      category,
      image: `https://picsum.photos/id/${(parseInt(id) % 200) + 10}/600/600`,
      vendorId,
      stock: Math.floor(Math.random() * 100) + 10,
      rating: parseFloat(rating.toFixed(1)),
      reviews
    };
  });
};

export const CATEGORIES = [
  'All', 
  'Electronics', 
  'Fashion', 
  'Home', 
  'Beauty', 
  'Fitness', 
  'Kitchen', 
  'Pets', 
  'Garden',
  'Books',
  'Toys',
  'Automotive',
  'Office'
];

export const INITIAL_PRODUCTS: Product[] = [
  ...generateCategoryProducts('Electronics', 20, 100, 250, 'v1'),
  ...generateCategoryProducts('Fashion', 20, 200, 55, 'v2'),
  ...generateCategoryProducts('Home', 20, 300, 90, 'v1'),
  ...generateCategoryProducts('Beauty', 20, 400, 35, 'v2'),
  ...generateCategoryProducts('Fitness', 20, 500, 60, 'v3'),
  ...generateCategoryProducts('Kitchen', 20, 600, 130, 'v1'),
  ...generateCategoryProducts('Pets', 20, 700, 20, 'v3'),
  ...generateCategoryProducts('Garden', 20, 800, 75, 'v2'),
  ...generateCategoryProducts('Books', 20, 900, 15, 'v1'),
  ...generateCategoryProducts('Toys', 20, 1000, 40, 'v3'),
  ...generateCategoryProducts('Automotive', 20, 1100, 180, 'v2'),
  ...generateCategoryProducts('Office', 20, 1200, 85, 'v1'),
];

export const MOCK_USER: User = {
  id: 'user123',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: UserRole.CUSTOMER,
  avatar: 'https://picsum.photos/id/64/100/100'
};
