import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
  import { VariablesService } from '../public/variables.service';
  import { AuthService } from '../auth/auth.service';
  import Swal from 'sweetalert2';
  
  const TOKEN_KEY = 'auth-token';
  const USER_KEY = 'auth-user';
  
  @Injectable({
    providedIn: 'root',
  })
  export class GeneralService {
    super() {
      throw new Error('Method not implemented.');
    }
    credentials = {
      client_id: 'eLIB-b7fe5651-83a5-40f5-8e66-981c74a97e61',
      client_secret: 'f0SP93m1SGg2Mkb9NEEjsAHvOip5lbqW',
    };
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    token: any;
    checkedToken: any;
    private url = this.variable.baseUrl + 'users';
    constructor(
      private variable: VariablesService,
      private http: HttpClient,
      private auth: AuthService
    ) {}
  
    userAuthorization() {
      this.token = localStorage.getItem('token');
      const httpHeaders = new HttpHeaders().set('x-access-token', this.token);
      return httpHeaders;
    }
  
    public_credentials= {
      client_email:"info@public.org",
       password: "bd8c53c0-6c75-4cbb-a49d-19318cab603e"
    };
  
    // staffPermission() {
    //   this.auth.ecmsLogin(this.credentials).subscribe(
    //     (res) => {
    //       localStorage.setItem('ecmsToken', res.cmsResponse.access_token);
    //     },
    //     (err) => {
    //       this.variable.loginErrorAlert = true;
    //       this.variable.loginErrorMesssage = err.error.message;
    //     }
    //   );
    // }
  
  
    ecmsAuthorization() {
      var token = localStorage.getItem('ecmsToken');
      const httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return httpHeaders;
    }
  
  publicAuthorization(accessToken:any) {
      const httpHeaders = new HttpHeaders().set('x-access-token',accessToken);
      return httpHeaders;
    }
  
    public getUser(): any {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
      return {};
    }
  
    checkToken() {
      return this.http.get<any>(`${this.url}/checkToken`, {
        headers: this.userAuthorization(),
      });
    }
  
    // checkTokens() {
    //   return this.http.post<any>(`${this.url2}`, {
    //     headers: this.userAuthorization(),
    //   });
    // }
  
    successMessage(message: any, callback?: any) {
      const trimmedTitle = 'Congratulation !';
      const translatedTitle = trimmedTitle;
      const translatedMessage = message;
      const confirmButtonText = 'Close';
  
      return Swal.fire({
        confirmButtonText: confirmButtonText,
        title: translatedTitle ? translatedTitle : translatedMessage,
        text: translatedTitle ? translatedMessage : '',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        preConfirm: callback,
      });
    }
  
  
    argumentMessage(message: any, callback?: any) {
      const trimmedTitle = 'Your Argument has been submitted successfuly, wait for your incharge to act upon !';
      const translatedTitle = trimmedTitle;
      const translatedMessage = message;
      const confirmButtonText = 'Close';
  
      return Swal.fire({
        confirmButtonText: confirmButtonText,
        title: translatedTitle ? translatedTitle : translatedMessage,
        text: translatedTitle ? translatedMessage : '',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        preConfirm: callback,
      });
    }
  
  
    appealMessage(message: any, callback?: any) {
      const trimmedTitle = 'Your Appeal has been submitted successfuly!';
      const translatedTitle = trimmedTitle;
      const translatedMessage = message;
      const confirmButtonText = 'Close';
  
      return Swal.fire({
        confirmButtonText: confirmButtonText,
        title: translatedTitle ? translatedTitle : translatedMessage,
        text: translatedTitle ? translatedMessage : '',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        preConfirm: callback,
      });
    }
  
  
    successAssessmentDoneMessage(message: any, callback?: any) {
      const trimmedTitle = 'Congratulation !,Your assessment has been successfully completed';
     
      const translatedTitle = trimmedTitle;
      const translatedMessage = message;
      const confirmButtonText = 'Close';
  
      return Swal.fire({
        confirmButtonText: confirmButtonText,
        title: translatedTitle ? translatedTitle : translatedMessage,
        text: translatedTitle ? translatedMessage : '',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        preConfirm: callback,
      });
    }
  
    successAssessmentAcceptedMessage(message: any, callback?: any) {
      const trimmedTitle = 'Congratulation !,The assessment has been successfully completed';
      const translatedTitle = trimmedTitle;
      const translatedMessage = message;
      const confirmButtonText = 'Close';
  
      return Swal.fire({
        confirmButtonText: confirmButtonText,
        title: translatedTitle ? translatedTitle : translatedMessage,
        text: translatedTitle ? translatedMessage : '',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        preConfirm: callback,
      });
    }
  
    errorMessage(message: any, callback?: any) {
      const trimmedTitle = 'Failed';
      const translatedTitle = trimmedTitle;
      const translatedMessage = message;
      const confirmButtonText = 'Close';
  
      return Swal.fire({
        confirmButtonText: confirmButtonText,
        title: translatedTitle ? translatedTitle : translatedMessage,
        text: translatedTitle ? translatedMessage : '',
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        preConfirm: callback,
      });
    }
  
    verifyToken() {
      this.checkToken().subscribe(
        (result) => {
          this.checkedToken = result;
        },
  
        (error) => {
          this.checkedToken = error;
        }
      );
    }
  }
  
  