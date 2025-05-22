import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../../models/category.model';

@Pipe({
  name: 'categoryFilter',
  standalone: false
})
export class CategoryFilterPipe implements PipeTransform {
  transform(categories: Category[], categoryId: string): Category | undefined {
    return categories.find(category => category.id === categoryId);
  }
} 