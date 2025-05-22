import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbRatingModule, NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomesRoutingModule } from './homes-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { IndexComponent } from './index/index.component';
import { CategoryFilterPipe } from './index/category-filter.pipe';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    IndexComponent,
    CategoryFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    SlickCarouselModule,
    HomesRoutingModule,
    NgbRatingModule,
    NgxImageZoomModule,
    LightboxModule,
    NgbTooltipModule,
    NgbModalModule,
    TranslateModule
  ],
  providers: [
    DecimalPipe,
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomesModule { }
