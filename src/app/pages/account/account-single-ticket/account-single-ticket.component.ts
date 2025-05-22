import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-single-ticket',
  templateUrl: './account-single-ticket.component.html',
  styleUrls: ['./account-single-ticket.component.scss']
})

/**
 * Account Single Ticket Component
 */
export class AccountSingleTicketComponent implements OnInit {

  // Form Submit
  userForm!: UntypedFormGroup;
  submitted = false;
  public isCollapsed = true;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * Form Validation
     */
     this.userForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }

  get form() {
    return this.userForm.controls;
  }

  /**
   * Save user
   */
  saveUser() {
    if (this.userForm.valid) { }
    this.submitted = true;    
  }

}
