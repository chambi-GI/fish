import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuyerService } from 'src/app/services/buyer.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.scss'
})
export class BuyerDashboardComponent implements OnInit {
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

  constructor(private buyerService: BuyerService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('buyerInfo');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    this.buyerService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboard = data;
      },
      error: (err) => {
        // Handle error, show message, etc.
      }
    });
  }
}
