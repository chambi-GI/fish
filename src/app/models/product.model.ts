export interface ProductImage {
  id?: string;
  url: string;
  isMain?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unitPrice?: number;
  quantity: number;
  stock?: number;
  categoryId: string;
  images: ProductImage[];
  isActive: boolean;
  isAvailable?: boolean;
  rating?: number;
  review?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  sellerId: string;
  sku?: string;
  weight?: number;
  unit?: string;
  discount?: number;
  discountEndDate?: Date;
  totalSold?: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  images: ProductImage[];
  isActive?: boolean;
  sku?: string;
  weight?: number;
  unit?: string;
  discount?: number;
  discountEndDate?: Date;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: string;
}

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  search?: string;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
} 