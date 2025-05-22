import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.scss']
})
export class SellerSidebarComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}
  isCollapsed = false;
  sellerName: string = '';
  email: string = '';

  menuItems = [
    {
      title: 'Dashboard',
      icon: 'ci-dashboard',
      link: '/admin/seller/dashboard'
    },
    {
      title: 'Products',
      icon: 'ci-package',
      link: '/admin/seller/products'
    },
    {
      title: 'Orders',
      icon: 'ci-cart',
      link: '/admin/seller/orders'
    },
    {
      title: 'Profile',
      icon: 'ci-user',
      link: '/admin/seller/profile'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getSellerInfo();
  }

  getSellerInfo() {
    const sellerInfo = localStorage.getItem('sellerInfo');
    if (sellerInfo) {
      this.sellerName = JSON.parse(sellerInfo).name;
      this.email = JSON.parse(sellerInfo).email;
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
} 