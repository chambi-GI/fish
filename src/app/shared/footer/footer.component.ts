import { Component } from '@angular/core';

// Language
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

/**
 * Footer Component
 */
export class FooterComponent {

  flagvalue: any;
  selectedLanguage: any;
  flag: any;
  countryName: any;
  cookieValue: any;
  valueset: any;
  currentYear = new Date().getFullYear();

  constructor(public languageService: LanguageService,
    public _cookiesService: CookieService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/img/flags/en.png'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

    this.selectedLanguage = 'Eng / $'
  }

  /***
 * Language Listing
 */
  listLang = [
    { text: 'English', flag: 'assets/img/flags/en.png', lang: 'en', language: 'Eng / $' },
    { text: 'Deutsche', flag: 'assets/img/flags/de.png', lang: 'de', language: 'DE / £' },
    { text: 'Italiana', flag: 'assets/img/flags/it.png', lang: 'it', language: 'IT / ¥' },
    { text: 'français', flag: 'assets/img/flags/fr.png', lang: 'fr', language: 'FR / €' },
  ];

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

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
