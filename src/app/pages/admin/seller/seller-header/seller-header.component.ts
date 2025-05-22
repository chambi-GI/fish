import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

import { CartData } from 'src/app/pages/shops/shop-cart/data';

// Language
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.scss'],

})

/**
 * Header Component
 */
export class SellerHeaderComponent implements OnInit {


  showNavigationArrows = true;
  showNavigationIndicators: any;

  loginPassfield!: boolean;
  public isCollapsed = true;
  cartDatas: any;
  subTotal = 0;
  Total: any;

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;

  //  Signup form
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  SignupForm!: UntypedFormGroup;
  submit = false;

  // Language set
  flagvalue: any;
  selectedLanguage: any;
  flag: any;
  countryName: any;
  cookieValue: any;
  valueset: any;

  menuVisible = false;
  categoryList: any;
  sellerName: string = 'Olivia Rhye';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    private categories: CategoriesService,
    public translate: TranslateService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    const pathName = window.location.pathname;
    this.getCategories();
    this.getSellerInfo();
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    /**
     * Form Validatyion
     */
    this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    // Language set
    this.cookieValue = this._cookiesService.get('lang');
 
    this.selectedLanguage = 'Eng / $'

    this.cartDatas = CartData;

  }

  calculatetotal(total: any) {
    this.subTotal = 0;
    this.cartDatas.forEach((element: any) => {

      this.subTotal += parseFloat(element.price)
    });
    return this.subTotal.toFixed(2)
  }

  /***
   * Activate droup down set
   */
  ngAfterViewInit() {
    // this.initActiveMenu();
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }

  //------------------ Sign In Form ---------------------//
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  }

  /**
   * Password Hide/Show
   */
  toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  //------------------ Sign Up Form ---------------------//

  // convenience getter for easy access to form fields
  get fa() { return this.SignupForm.controls; }

  /**
   * Form submit
   */
  SignupSubmit() {
    this.submit = true;

    // stop here if form is invalid
    if (this.SignupForm.invalid) {
      return;
    }
  }

  /**
 * Password Hide/Show
 */
  togglesignupPassfield() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
  * Password Hide/Show
  */
  togglesignupCPassfield() {
    this.signupCPassfield = !this.signupCPassfield;
  }

  // Scroll Toggle Menu Hide/Show
  menuShow() {
    this.menuVisible = !this.menuVisible
    // document.querySelector('.navbar-stuck-menu')?.classList.toggle('show');
  }

  // Sidebar Toggle
  sidebar() {
    document.getElementById('shop-sidebar')?.classList.add('show');
  }



  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string, language: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.selectedLanguage = language
    this.languageService.setLanguage(lang);
  }


  remove(id: any) {
    this.subTotal -= parseFloat(this.cartDatas[id].price)
    this.cartDatas.splice(id, 1);
  }

  getCategories() {
    this.categories.getCategories().subscribe({
      next: (categories) => {
        this.categoryList = categories;
      },
      error: (error: Error) => {
        if (error.message.includes('token')) {
          localStorage.setItem('token', '0');
        }
      }
    });
  }

  getSellerInfo() {
    const sellerInfo = localStorage.getItem('sellerInfo');
    if (sellerInfo) {
      this.sellerName = JSON.parse(sellerInfo).name;
    }
  }

  logout() {
    localStorage.removeItem('sellerInfo');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
    this.toastr.success('Logged out successfully');
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.seller-sidebar');
    sidebar?.classList.toggle('collapsed');
  }
}
