import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbDropdownModule, NgbNavModule, NgbRatingModule, NgbCollapseModule, NgbTooltipModule, NgbAccordionModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TrendingComponent } from './components/trending/trending.component';
import { BrandLogosComponent } from './components/brand-logos/brand-logos.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TrendingComponent,
    BrandLogosComponent,
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbRatingModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SlickCarouselModule,
    TranslateModule,
    NgbAccordionModule,
    NgbModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    LanguageService,
    DecimalPipe,
    DatePipe
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbRatingModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SlickCarouselModule,
    TranslateModule,
    NgbAccordionModule,
    NgbModalModule,
    HeaderComponent,
    FooterComponent,
    TrendingComponent,
    BrandLogosComponent,
    SideMenuComponent,
    DecimalPipe,
    DatePipe
  ]
})
export class SharedModule { }
