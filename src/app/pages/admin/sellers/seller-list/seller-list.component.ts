import { Component, OnInit } from '@angular/core';
import { SellerService, Seller } from '../../../../services/seller/seller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss']
})
export class SellerListComponent implements OnInit {
  sellers: Seller[] = [];
  loading = false;
  selectedSeller: Seller | null = null;

  constructor(
    private sellerService: SellerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers(): void {
    this.loading = true;
    this.sellerService.getAllSellers().subscribe({
      next: (data) => {
        this.sellers = data;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load sellers');
        this.loading = false;
      }
    });
  }

  verifySeller(seller: Seller): void {
    this.sellerService.verifySeller(seller.id).subscribe({
      next: () => {
        this.toastr.success('Seller verified successfully');
        this.loadSellers();
      },
      error: (error) => {
        this.toastr.error('Failed to verify seller');
      }
    });
  }

  unverifySeller(seller: Seller): void {
    this.sellerService.unverifySeller(seller.id).subscribe({
      next: () => {
        this.toastr.success('Seller unverified successfully');
        this.loadSellers();
      },
      error: (error) => {
        this.toastr.error('Failed to unverify seller');
      }
    });
  }

  viewSellerDetails(seller: Seller): void {
    this.selectedSeller = seller;
  }

  closeDetails(): void {
    this.selectedSeller = null;
  }
  




  
} 