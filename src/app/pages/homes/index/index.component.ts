import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';
import { ProductsService } from '../../../services/products/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartData } from '../../shops/shop-cart/data';
import { Category } from '../../../models/category.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { DecimalPipe, DatePipe } from '@angular/common';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Product } from '../../../models/product.model';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [DecimalPipe, DatePipe],
  // imports: [FooterComponent],
})

/**
 * Index Component
 */
export class IndexComponent implements OnInit {
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

  cartItems: CartItem[] = [];
  totalCartAmount: number = 0;

  constructor(
    private modalService: NgbModal,
    public categories: CategoriesService,
    public product: ProductsService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.getCategoriesList(); 
    this.startAutoplay();
    this.loadCart();
  }

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
        this.updatePagedProducts();
      },
      error: (err: Error) => {
        if (err.message.includes('token')) {
          localStorage.setItem('token', '0');
        }
      }
    });
  }

  cart(index: number): void {
    CartData.push(this.Gridlists[index]);
  }

  centerModal(modal: any, product: Product): void {
    this.singleData = product;
    this.product_img = product.images[0]?.url;
    this.modalService.open(modal, { size: 'xl', centered: true });
  }

  filterImg(index: number): void {
    this.product_img = this.singleData.images[index]?.url;
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
        this.updatePagedProducts();
      },
      error: (err: Error) => {
        this.toastr.error('Failed to load products. Please try again.');
      }
    });
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

  ngAfterViewInit() {
    // Initialize carousel after view is ready
    setTimeout(() => {
      if (this.slickModal) {
        this.carouselInitialized = true;
      }
    });
  }

  startAutoplay(): void {
    if (this.carouselInitialized) {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  nextSlide() {
    if (this.slickModal && this.carouselInitialized) {
      this.slickModal.slickNext();
    }
  }

  prevSlide() {
    if (this.slickModal && this.carouselInitialized) {
      this.slickModal.slickPrev();
    }
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
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

  addToCart(product: Product) {
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning('Please login to add items to cart');
      this.router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    const existingItem = this.cartItems.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: product.id,
        quantity: 1,
        price: product.unitPrice ?? 0
      });
    }
    this.updateCart();
    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.updateCart();
    this.saveCart();
  }

  updateCartItemQuantity(productId: string, quantity: number) {
    const item = this.cartItems.find(item => item.productId === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCart();
        this.saveCart();
      }
    }
  }

  updateCart() {
    this.totalCartAmount = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCart();
    }
  }

  getProductById(productId: string): Product | undefined {
    return this.productList.find(product => product.id === productId);
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartItemQuantity(productId: string): number {
    const item = this.cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }

  isInCart(productId: string): boolean {
    return this.cartItems.some(item => item.productId === productId);
  }

  sortProducts(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    switch (value) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.unitPrice - b.unitPrice);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.unitPrice - a.unitPrice);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // Reset to original order
        this.getProducts();
        return;
    }

    this.updatePagedProducts();
  }

  isNewProduct(product: Product): boolean {
    const now = new Date();
    const productDate = new Date(product.createdAt);
    const diffTime = Math.abs(now.getTime() - productDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Consider products as "new" if they're less than 7 days old
  }

  searchProducts() {
    let results = [...this.productList];
    // Apply search query filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    // Apply price range filter
    if (this.priceRange) {
      const [min, max] = this.priceRange.split('-').map(Number);
      results = results.filter(product => {
        if (max) {
          return (product.unitPrice ?? 0) >= min && (product.unitPrice ?? 0) <= max;
        } else {
          return (product.unitPrice ?? 0) >= min;
        }
      });
    }
    // Apply sorting
    switch (this.sortBy) {
      case 'price-asc':
        results.sort((a, b) => (a.unitPrice ?? 0) - (b.unitPrice ?? 0));
        break;
      case 'price-desc':
        results.sort((a, b) => (b.unitPrice ?? 0) - (a.unitPrice ?? 0));
        break;
      case 'rating':
        results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    this.filteredProducts = results;
    this.currentPage = 1;
    this.updatePagedProducts();
  }
}
