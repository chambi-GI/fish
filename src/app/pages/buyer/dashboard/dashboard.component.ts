import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerService } from 'src/app/services/buyer.service';
import { SellersService } from 'src/app/services/seller/sellers/sellers.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  dashboard: any = {};

  quickActions = [
    { icon: 'ci-plus', label: 'Browse Products' },
    { icon: 'ci-bar-chart', label: 'Reports' },
    { icon: 'ci-package', label: 'Orders' },
    { icon: 'ci-analytics', label: 'Analytics' }
  ];

  categories = [
    { label: 'All', active: true },
    { label: 'Free fish' },
    { label: 'Shell fish' },
    { label: 'Sea food' },
    { label: 'Special offers' }
  ];

  products: any[] = [];
  analytics: any = null;
  loading = true;
  error: string | null = null;
  showAddProductModal = false;
  showLogoutModal = false;

  analyticsChartData = [{ data: [], label: 'Sales' }];
  analyticsChartLabels: string[] = [];
  analyticsChartOptions = { responsive: true };

  constructor(
    private buyerService: BuyerService,
    private sellersService: SellersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // Determine if user is buyer or seller
    const buyerData = localStorage.getItem('buyerInfo');
    const sellerData = localStorage.getItem('sellerInfo');

    if (buyerData) {
      this.user = JSON.parse(buyerData);
      this.loadBuyerDashboard();
    } else if (sellerData) {
      this.user = JSON.parse(sellerData);
      this.loadSellerDashboard();
    } else {
      // No user info found
      this.router.navigate(['/auth/login']);
    }
  }

  // ----------- BUYER LOGIC ----------
  private loadBuyerDashboard() {
    this.buyerService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboard = data;
      },
      error: (err) => {
        console.error('Error fetching buyer dashboard data:', err);
      }
    });
  }

  // ----------- SELLER LOGIC ----------
  private loadSellerDashboard() {
    this.loadDashboardData();
    this.loadSellerProducts();
    this.loadAnalytics();
  }

  private loadDashboardData() {
    this.sellersService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  private loadSellerProducts() {
    this.sellersService.getSellerProducts().subscribe({
      next: (data) => this.products = data.products || [],
      error: () => this.products = []
    });
  }

  private loadAnalytics() {
    this.sellersService.getAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
        if (data && data.sales) {
          this.analyticsChartData = [{
            data: data.sales.map((s: any) => s.amount),
            label: 'Sales'
          }];
          this.analyticsChartLabels = data.sales.map((s: any) => s.date);
        }
      },
      error: () => this.analytics = null
    });
  }

  // ----------- UI CONTROL METHODS ----------
  openAddProductModal() {
    this.showAddProductModal = true;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
  }

  onProductAdded() {
    this.closeAddProductModal();
    this.loadSellerProducts();
  }

  goToAddProduct() {
    this.router.navigate(['/admin/seller/add-product']);
  }

  logout() {
    localStorage.removeItem('buyerInfo');
    localStorage.removeItem('sellerInfo');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  isSeller(): boolean {
    return this.user && Array.isArray(this.user.roles) && this.user.roles.includes('seller');
  }

  isVerified(): boolean {
    return this.user && this.user.isVerified === true;
  }

  tokenExists(): boolean {
    return !!localStorage.getItem('token');
  }
}
