import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from '../../../services/products/products.service';
import { CategoriesService } from '../../../services/categories/categories.service';
import { Product } from '../../../models/product.model';
import { ShopGridLsdata } from './data';
import { CartData } from '../shop-cart/data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.scss'],
  providers: [ProductsService, CategoriesService]
})
export class ProductByCategoryComponent implements OnInit {

  category_id!: string | null;
  categoryList: any;
  productLists: any[] = [];
  productList: any;
  filteredProductList: any[] = [];
  pagedProducts: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;

  singleData: any;
  product_img: any;

  constructor(
    private modalService: NgbModal,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.category_id = this.route.snapshot.paramMap.get("id");

    if (this.category_id) {
      this.getProductsByCategory(this.category_id);
      this.getCategory(this.category_id);
    }

    setTimeout(() => {
      document.querySelector('.sidebar-filter')?.classList.remove('d-none');
    });
  }

  getProductsByCategory(id: string): void {
    this.productService.getProductsByCategory(id).subscribe({
      next: (products: Product[]) => {
        this.productList = products;
        this.filterProducts();
      },
      error: (err: Error) => {
        this.toastr.error('Failed to load products');
      }
    });
  }

  getCategory(id: string): void {
    this.categoryService.getCategory(id).subscribe({
      next: (res: any) => this.categoryList = res,
      error: (err) => {
        if (err.error?.token === 0) {
          localStorage.setItem('token', err.error.token);
        }
      }
    });
  }

  filterProducts(): void {
    const query = this.searchText.toLowerCase();
    this.filteredProductList = this.productLists.filter(product =>
      product.name?.toLowerCase().includes(query)
    );
    this.totalPages = Math.ceil(this.filteredProductList.length / this.pageSize);
    this.updatePagedProducts();
  }

  updatePagedProducts(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.filteredProductList.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedProducts();
    }
  }

  centerModal(modal: any, product: any): void {
    this.singleData = product;
    this.product_img = product.image?.[0];
    this.modalService.open(modal, { size: 'xl', centered: true });
  }

  filterImg(index: number): void {
    this.product_img = this.singleData.image[index];
  }

  cart(product: any): void {
    CartData.push(product);
  }
}
