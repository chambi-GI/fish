import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService, Seller } from '../../../services/seller/seller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {
  profileForm: FormGroup;
  licenseForm: FormGroup;
  seller: Seller | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.licenseForm = this.fb.group({
      number: ['', Validators.required],
      expiryDate: ['', Validators.required],
      document: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSellerProfile();
  }

  loadSellerProfile(): void {
    this.loading = true;
    this.sellerService.getCurrentSeller().subscribe({
      next: (data) => {
        this.seller = data;
        this.profileForm.patchValue({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        });
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load profile');
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.licenseForm.patchValue({
        document: file
      });
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid && this.seller) {
      this.submitting = true;
      this.sellerService.updateSeller(this.seller.id, this.profileForm.value).subscribe({
        next: () => {
          this.toastr.success('Profile updated successfully');
          this.submitting = false;
          this.loadSellerProfile();
        },
        error: (error) => {
          this.toastr.error('Failed to update profile');
          this.submitting = false;
        }
      });
    }
  }

  submitLicense(): void {
    if (this.licenseForm.valid && this.seller) {
      this.submitting = true;
      const formData = new FormData();
      formData.append('number', this.licenseForm.get('number')?.value);
      formData.append('expiryDate', this.licenseForm.get('expiryDate')?.value);
      formData.append('document', this.licenseForm.get('document')?.value);

      this.sellerService.addLicense(this.seller.id, formData).subscribe({
        next: () => {
          this.toastr.success('License submitted successfully');
          this.submitting = false;
          this.loadSellerProfile();
          this.licenseForm.reset();
        },
        error: (error) => {
          this.toastr.error('Failed to submit license');
          this.submitting = false;
        }
      });
    }
  }
} 