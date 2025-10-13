export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // cents or decimal (alinhado ao backend)
  category: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}
