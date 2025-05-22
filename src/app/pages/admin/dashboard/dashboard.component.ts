import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders/orders.service';
import { ProductsService } from '../../../services/products/products.service';
import { Order } from '../../../models/order.model';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, NgChartsModule]
})
export class DashboardComponent implements OnInit {
  totalOrders = 0;
  totalRevenue = 0;
  bestSellers: Product[] = [];
  recentOrders: Order[] = [];
  loading = false;

  // Chart data
  orderChartLabels: string[] = [];
  orderChartData: number[] = [];
  orderChartType = 'line';

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadRecentOrders();
    this.loadBestSellers();
    this.loadOrderTrends();
  }

  loadStatistics() {
    this.ordersService.getOrderStatistics().subscribe(stats => {
      this.totalOrders = stats.totalOrders;
      this.totalRevenue = stats.totalRevenue;
    });
  }

  loadRecentOrders() {
    this.ordersService.getRecentOrders(5).subscribe(orders => {
      this.recentOrders = orders;
    });
  }

  loadBestSellers() {
    this.productsService.getBestSellers().subscribe(products => {
      this.bestSellers = products;
    });
  }

  loadOrderTrends() {
    // Example: fetch orders by date range for the last 7 days
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    this.ordersService.getOrdersByDateRange(start, end).subscribe(orders => {
      // Group by day and count totals
      const map = new Map<string, number>();
      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const key = d.toISOString().slice(0, 10);
        map.set(key, 0);
      }
      orders.forEach(order => {
        const key = new Date(order.createdAt).toISOString().slice(0, 10);
        if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
      });
      this.orderChartLabels = Array.from(map.keys());
      this.orderChartData = Array.from(map.values());
    });
  }
} 