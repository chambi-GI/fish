import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products/products.service';
import { Product } from '../../../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productsService.getMyProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
        this.toastr.error(this.error);
      }
    });
  }

  onAddProduct(): void {
    this.router.navigate(['/seller/products/add']);
  }

  onEditProduct(productId: string): void {
    this.router.navigate(['/seller/products/edit', productId]);
  }

  onDeleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(productId).subscribe({
        next: () => {
          this.toastr.success('Product deleted successfully');
          this.loadProducts();
        },
        error: (error) => {
          this.toastr.error('Failed to delete product. Please try again.');
        }
      });
    }
  }

  onToggleActive(productId: string): void {
    this.productsService.toggleProductActive(productId).subscribe({
      next: (updatedProduct) => {
        const product = this.products.find(p => p.id === productId);
        if (product) {
          product.isAvailable = updatedProduct.isAvailable;
        }
        this.toastr.success(`Product ${updatedProduct.isAvailable ? 'activated' : 'deactivated'} successfully`);
      },
      error: (error) => {
        this.toastr.error('Failed to update product status. Please try again.');
      }
    });
  }

  onDeleteImage(productId: string, imageId: string): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.productsService.deleteProductImage(imageId).subscribe({
        next: () => {
          this.toastr.success('Image deleted successfully');
          this.loadProducts();
        },
        error: (error) => {
          this.toastr.error('Failed to delete image. Please try again.');
        }
      });
    }
  }
} 