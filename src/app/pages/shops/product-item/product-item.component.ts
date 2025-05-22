import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StyleData, PopulerData } from './data';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})

/**
 * ShopSingle V1 Component
 */
export class ProductItemComponent implements OnInit {

  // Review Form
  reviewForm!: UntypedFormGroup;
  submitted = false;
  styleDatas: any;
  populerDatas: any;
  zoomImag: any;
  productItem: any;
  item_id: any;
  seller_id: any;
  sellerProducts: any;

  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder,public product:ProductsService,   private router: Router,
    private activeRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.styleDatas = StyleData;
    this.populerDatas = PopulerData;
     this.item_id= this.activeRoute.snapshot.paramMap.get("id");
     this.getProducts(this.item_id);
    this.reviewForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      review: ['', [Validators.required]],
    });

    this.zoomImag = "assets/img/shop/single/gallery/th01.jpg"
  }

  /**
   * Size Chart Modal
   * @param sizeChartModal scroll modal data
   */
  sizetModal(sizeChartModal: any) {
    this.modalService.open(sizeChartModal, { size: 'md', centered: true });
  }
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // convenience getter for easy access to form fields
  get form() { return this.reviewForm.controls; }

  /**
  * Form submit
  */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }
  }

  /**
  * Swiper Style setting
  */
  Style = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 499,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  /**
  * Swiper Popular setting
  */
  Popular = {
    slidesToShow: 4, // Show 4 slides at a time
    slidesToScroll: 1,
    arrows: true, // Disable navigation arrows
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 499,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };


  filterImg(e: any, image: any) {
    document.querySelectorAll('.product-gallery-thumblist a').forEach(element => {
      element.classList.remove('active')
    });
    const img: any = (document.querySelector('#first img') as HTMLImageElement);
    img.src = image;
    e.target.closest('a').classList.add('active');
    this.zoomImag = image
  }





  getProducts(id:any) {
    this.product.getProduct(id).subscribe((res: any) => {
        this.productItem = res;
        
      },
      (err) => {
        if (err.error.token == 0) {
          localStorage.setItem('token', err.error.token);
        }
      }
    );
  }


}










