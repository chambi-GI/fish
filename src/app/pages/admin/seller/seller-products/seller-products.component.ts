import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SellersService } from 'src/app/services/seller/sellers/sellers.service';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-seller-products',
  standalone: true,
  imports: [CommonModule, RouterModule, AddProductModalComponent],
  templateUrl: './seller-products.component.html',
  styleUrl: './seller-products.component.scss'
})
export class SellerProductsComponent implements OnInit {
  products: any[] = [];
  loading = true;
  error: string | null = null;
  showAddProductModal = false;
  editingProduct: any = null;
  profile: any;

  constructor(private sellersService: SellersService) {}

  ngOnInit() {
    this.fetchProducts();
    this.getSellerProfile();
  }

  fetchProducts() {
    this.loading = true;
    this.sellersService.getSellerProducts().subscribe({
      next: (data) => {
        this.products = data.products || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load products';
        this.loading = false;
      }
    });
  }

  getSellerProfile() {
    this.loading = true;
    this.sellersService.getSellerProfile().subscribe({
      next: (data) => {
        this.profile = data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load products';
        this.loading = false;
      }
    });
  }

  openAddProductModal() {
    this.editingProduct = null;
    this.showAddProductModal = true;
  }

  openEditProductModal(product: any) {
    this.editingProduct = product;
    this.showAddProductModal = true;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
    this.editingProduct = null;
  }

  onProductAdded() {
    this.closeAddProductModal();
    this.fetchProducts();
  }

  deleteProduct(productId: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.sellersService.deleteProduct(productId).subscribe({
      next: () => {
        this.fetchProducts();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to delete product');
      }
    });
  }
}
