import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  trendingProducts: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadTrendingProducts();
  }

  loadTrendingProducts() {
    this.loading = true;
    this.productsService.getTrendingProducts().subscribe({
      next: (products) => {
        this.trendingProducts = products;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load trending products';
        this.loading = false;
        this.toastr.error(this.error);
      }
    });
  }

  addToCart(product: Product) {
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning('Please login to add items to cart');
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    // Add to cart logic here
    this.toastr.success('Product added to cart');
  }
} 