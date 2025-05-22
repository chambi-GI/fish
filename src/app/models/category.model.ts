export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  imageUrls?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  image?: string;
  imageUrls?: string[];
  isActive?: boolean;
  parentId?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  id: string;
} 