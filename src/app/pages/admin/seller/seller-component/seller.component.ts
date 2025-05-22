
import { Router } from '@angular/router';
import { SellersService } from 'src/app/services/seller/sellers/sellers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload/upload.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { CartService } from '../../../../services/cart/cart.service';

  import { Component, OnInit, ViewChild } from '@angular/core';
  import { CategoriesService } from '../../../../services/categories/categories.service';
  import { ProductsService } from '../../../../services/products/products.service';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { Category } from '../../../../models/category.model';
  import { ToastrService } from 'ngx-toastr';
  import { DecimalPipe, DatePipe } from '@angular/common';
  import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
  user: any = null;
  dashboard: any = {};
  showAddProductModal = false;
  showLogoutModal = false;
  showProfileModal = false;

  profileStep = 0;
  profileProgress = 33;

  profileInfoForm!: FormGroup;
  isLoading = false;
  isUploadingFront = false;
  isUploadingBack = false;

  countries = ['Tanzania', 'Kenya', 'Uganda'];
  regions = ['Dar es Salaam', 'Arusha', 'Mwanza'];

  frontNationalIdPreview: string | null = null;
  backNationalIdPreview: string | null = null;

  frontNationalIdError = false;
  backNationalIdError = false;

  showReview: boolean = false;
  reviewData: any = {};

  constructor(
    private router: Router,
    private sellersService: SellersService,
    private fb: FormBuilder,
     private toastr: ToastrService,
    private uploadService: UploadService,
      public authService: AuthService,
         public categories: CategoriesService,
      public product: ProductsService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
     this.loadUserData();
      this.getCategories();
      this.getProducts();
      this.getCategoriesList(); 
     
    this.loadCartData();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const storedUser = localStorage.getItem('sellerInfo');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.initForm();
    this.patchUserData();
    this.loadDashboardData();
  }

  initForm() {
    this.profileInfoForm = this.fb.group({
      businessName: ['', Validators.required],
      frontNationalId: ['', Validators.required],
      nationalId: ['', Validators.required],
      backNationalId: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      district: ['', Validators.required]
    });
  }

  patchUserData() {
    if (this.user) {
      this.profileInfoForm.patchValue({
        businessName: this.user.businessName || '',
        address: this.user.address || '',
        country: this.user.country || '',
        region: this.user.region || '',
        district: this.user.district || '',
        nationalId: this.user.nationalId || '',
        frontNationalId: this.user.frontNationalId || '',
        backNationalId: this.user.backNationalId || ''
      });

      this.frontNationalIdPreview = this.user.frontNationalId || null;
      this.backNationalIdPreview = this.user.backNationalId || null;
    }
  }

  loadDashboardData(): void {
    this.sellersService.getSellerProfile().subscribe({
      next: (res) => {
        this.dashboard = res;
      },
      error: (err) => {
        console.error('Dashboard load failed', err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('sellerInfo');
    this.router.navigate(['/auth/login']);
   this.authService.logout();
    this.router.navigate(['/']);
  }

  openAddProductModal(): void {
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.showAddProductModal = false;
  }

  closeProfileModal(): void {
    this.showProfileModal = false;
  }

  openProfileModal(): void {
    this.showProfileModal = true;
    this.profileStep = 0;
    this.updateProfileProgress();
  }

  nextProfileStep(): void {
    if (this.profileStep < 2) {
      this.profileStep++;
      this.updateProfileProgress();
    }
  }

  prevProfileStep(): void {
    if (this.profileStep > 0) {
      this.profileStep--;
      this.updateProfileProgress();
    }
  }

  updateProfileProgress(): void {
    this.profileProgress = (this.profileStep + 1) * 33;
  }

  reviewProfileData() {
    this.profileInfoForm.markAllAsTouched();
    if (this.profileInfoForm.invalid) return;
    this.reviewData = this.profileInfoForm.value;
    this.showReview = true;
  }

  // submitProfileStepper(): void {
  //   if (this.profileInfoForm.invalid) {
  //     this.profileInfoForm.markAllAsTouched();
  //     return;
  //   }
  //   const payload = this.profileInfoForm.value;
  //   this.isLoading = true;
  //   this.sellersService.createSeller(payload).subscribe({
  //     next: () => {
  //       this.isLoading = false;
  //       this.closeProfileModal();
  //       this.loadDashboardData();
  //     },
  //     error: () => {
  //       this.isLoading = false;
  //     }
  //   });
  // }

  onFileSelected(event: any, type: 'frontNationalId' | 'backNationalId') {
    const file = event.target.files[0];
    if (file) {
      if (type === 'frontNationalId') this.isUploadingFront = true;
      if (type === 'backNationalId') this.isUploadingBack = true;

      this.uploadService.uploadImage(file, 'national-ids').subscribe({
        next: (url: string) => {
          this.profileInfoForm.patchValue({ [type]: url });
          this.profileInfoForm.get(type)?.markAsTouched();

          if (type === 'frontNationalId') {
            this.frontNationalIdPreview = url;
            this.frontNationalIdError = false;
            this.isUploadingFront = false;
          } else {
            this.backNationalIdPreview = url;
            this.backNationalIdError = false;
            this.isUploadingBack = false;
          }
        },
        error: () => {
          if (type === 'frontNationalId') {
            this.frontNationalIdError = true;
            this.isUploadingFront = false;
          } else {
            this.backNationalIdError = true;
            this.isUploadingBack = false;
          }
        }
      });
    } else {
      if (type === 'frontNationalId') this.frontNationalIdError = true;
      else this.backNationalIdError = true;
    }
  }

  confirmClose() {
  if (confirm('Are you sure you want to close without submitting?')) {
    this.showProfileModal = false;
  }
}

submitProfileStepper() {
  if (this.profileInfoForm.invalid) {
    this.profileInfoForm.markAllAsTouched();
    return;
  }

}




  currentUser: any;
  cartDatas: any[] = [];
  subTotal: number = 0;



  loadUserData() {
    this.currentUser = this.authService.getCurrentUser();
  }

  loadCartData() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartDatas = items;
      this.subTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    });
  }

  calculatetotal(amount: number): string {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  remove(index: number) {
    this.cartService.removeFromCart(index);
    this.loadCartData();
  }




  
  // interface CartItem {
  //   productId: string;
  //   quantity: number;
  //   price: number;
  // }
  

    currentIndex = 0;
    autoplayInterval: any;
    categoryLists: Category[] = [];
    categoryList: Category[] = [];
    pagedCategory: Category[] = [];
    productList: Product[] = [];
    pagedProducts: Product[] = [];
    currentPage: number = 1;
    pageSize: number = 8; // Show 8 products per page
    totalPages: number = 0;
    Gridlists: any[] = [];
    category_id: any;
    AllGridlists: any[] = [];
    AllGridSize: any[] = [];
    AllGridColor: any[] = [];
  
    total: number = 0;
    totalRecords: number = 0;
  
    page: number = 1;
    startIndex: number = 0;
    endIndex: number = 9;
  
    singleData: any;
    product_img: any;
  
    minValue: number = 250;
    maxValue: number = 721;
    checkedVal: string[] = [];
  
    @ViewChild('slickModal') slickModal: any;
    carouselInitialized = false;
  
    Coverflow: any = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      fade: true,
      cssEase: 'linear',
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  
    selectedCategory: string = 'all';
    searchQuery: string = '';
    priceRange: string = '';
    sortBy: string = 'relevance';
    filteredProducts: any[] = [];
    totalCartAmount: number = 0;
  
  
  

    getCategories() {
      this.categories.getCategories().subscribe({
        next: (categories: Category[]) => {
          this.categoryList = categories;
        },
        error: (error: Error) => {
          if (error.message.includes('token')) {
            localStorage.setItem('token', '0');
          }
        }
      });
    }
  
    getCategoriesList() {
      this.categories.getCategories().subscribe({
        next: (res: Category[]) => {
          this.categoryLists = res;
          this.totalPages = Math.ceil(this.categoryLists.length / this.pageSize);
          // this.updatePagedProducts();
        },
        error: (err: Error) => {
          if (err.message.includes('token')) {
            localStorage.setItem('token', '0');
          }
        }
      });
    }
  
  getProducts() {
    this.product.getAllProducts().subscribe({
      next: (res: Product[]) => {
        this.productList = res.map(product => ({
          ...product,
          unitPrice: product.unitPrice ?? product.price ?? 0,
          stock: product.stock ?? product.quantity ?? 0,
          rating: product.rating ?? 0,
          review: product.review ?? 0,
          isAvailable: product.isAvailable ?? true,
          images: (product.images || []).map((img: any) => typeof img === 'string' ? { url: img } : img)
        }));
        this.filteredProducts = this.productList;
        this.totalPages = Math.ceil(this.productList.length / this.pageSize);
       
      },
      error: (err: Error) => {
        this.toastr.error('Failed to load products. Please try again.');
      }
    });
  }


  filterByCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.currentPage = 1; // Reset to first page when changing category
    if (categoryId === 'all') {
      this.filteredProducts = this.productList;
    } else {
      this.filteredProducts = this.productList.filter(product => 
        product.categoryId === categoryId
      );
    }
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.updatePagedProducts();
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = this.productList;
    } else {
      this.filteredProducts = this.productList.filter((product: Product) => 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.updatePagedProducts();
  }

 
  updatePagedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
    
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedProducts();
    }
  }
} 

