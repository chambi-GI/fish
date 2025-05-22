import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})

/**
 * Account Profile Component
 */
export class AccountProfileComponent implements OnInit {

  NPasswordType!: boolean;
  CPasswordType!: boolean;
  public isCollapsed = true;
  userProfile: any = null;
  loading = false;
  error: string | null = null;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load profile.';
        this.loading = false;
      }
    });
  }

  /**
   * New Password Hide/Show
   */
   toggleNewPassword() {
    this.NPasswordType = !this.NPasswordType;
  }

  /**
   * Confirm Password Hide/Show
   */
   toggleConfirmPassword() {
    this.CPasswordType = !this.CPasswordType;
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event:any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#user_profile').forEach((element:any) => {
        element.src = this.imageURL;
      });
    }
    reader.readAsDataURL(file)
  }

  editProfile() {
    // Implement edit profile logic or navigation
  }

}
