import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService, Order } from '../../../services/order/order.service';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { AuthService } from '../../../services/auth/auth.service';

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit {
  user: User = {
    name: 'Unknown',
    email: '',
    role: 'Buyer',
    avatar: 'assets/img/avatar.png'
  };
  stats = {
    totalOrders: 0,
    wishlist: 0,
    pendingPayments: 0,
    delivered: 0
  };
  allOrders: Order[] = [];
  recentOrders: Order[] = [];
  filterStatus: string = 'All';
  loading: boolean = true;

  constructor(
    private orderService: OrderService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchOrders();
    this.fetchWishlist();
  }

  fetchUser() {
    this.authService.getUserProfile().subscribe({
      next: (user: any) => {
        this.user = {
          name: user.name || 'Unknown',
          email: user.email || '',
          role: user.role || 'Buyer',
          avatar: user.avatar || 'assets/img/avatar.png'
        };
      },
      error: () => {
        this.user = {
          name: 'Unknown',
          email: '',
          role: 'Buyer',
          avatar: 'assets/img/avatar.png'
        };
      }
    });
  }

  fetchOrders() {
    this.orderService.getCustomerOrders().subscribe({
      next: (orders) => {
        this.allOrders = orders;
        this.stats.totalOrders = orders.length;
        this.stats.pendingPayments = orders.filter(o => o.status.toLowerCase() === 'pending').length;
        this.stats.delivered = orders.filter(o => o.status.toLowerCase() === 'delivered').length;
        this.applyOrderFilter();
        this.loading = false;
      },
      error: () => {
        this.allOrders = [];
        this.loading = false;
      }
    });
  }

  fetchWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (items) => {
        this.stats.wishlist = items.length;
      },
      error: () => {
        this.stats.wishlist = 0;
      }
    });
  }

  applyOrderFilter() {
    if (this.filterStatus === 'All') {
      this.recentOrders = this.allOrders.slice(0, 8);
    } else {
      this.recentOrders = this.allOrders.filter(o => o.status.toLowerCase() === this.filterStatus.toLowerCase()).slice(0, 8);
    }
  }

  setFilter(status: string) {
    this.filterStatus = status;
    this.applyOrderFilter();
  }

  // Quick Actions
  goToOrders() {
    this.router.navigate(['/account/orders']);
  }
  goToWishlist() {
    this.router.navigate(['/account/wishlist']);
  }
  goToPayments() {
    this.router.navigate(['/account/payments']);
  }
  goToProfile() {
    this.router.navigate(['/account/profile']);
  }
} 