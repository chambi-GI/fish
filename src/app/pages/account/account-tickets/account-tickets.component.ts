import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';
import {DatePipe} from '@angular/common';

import { tableData } from './data';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-tickets',
  templateUrl: './account-tickets.component.html',
  styleUrls: ['./account-tickets.component.scss']
})

/**
 * Account Tickets Component
 */
export class AccountTicketsComponent implements OnInit {

  tableData:any;
  public isCollapsed = true;
  // Form Submit
  userForm!: UntypedFormGroup;
  submitted = false;
  tickets:any = '';

  constructor(private modalService: NgbModal,private formBuilder: UntypedFormBuilder,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.tableData = tableData;

    /**
     * Form Validation
     */
     this.userForm = this.formBuilder.group({
      ids: [''],
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }

  /**
   * Open Modal
   * @param sizeChartModal scroll modal data
   */
   OpenModal(sizeChartModal: any) {
    this.modalService.open(sizeChartModal, { size: 'lg', centered: true });
  }

  get form() {
    return this.userForm.controls;
  }

  /**
   * Save user
   */
   saveUser() {
    if (this.userForm.valid) {
      var dt = new Date();
      dt.setDate(dt.getDate() + 2);
      const s_date = this.datePipe.transform(new Date(),'M/d/yyyy')
      const e_date = this.datePipe.transform(dt,'M/d/yyyy')      
      const title = this.userForm.get('title')?.value;
      const type = this.userForm.get('type')?.value;
      const priority = this.userForm.get('priority')?.value;   
      const status= 'Closed';  

      this.tableData.push({
        id: this.tableData.length + 1,
        title,
        s_date,
        e_date,
        type,
        priority,
        status
      })  
    this.modalService.dismissAll();
    this.userForm.reset();
    }
    this.submitted = true;    
  }

  // Tickets sort filter
  ticketFilter(){
    if (this.tickets != '') {
      this.tableData = tableData.filter((product: any) => {
        return product.status === this.tickets;
      });
    }
    else{
      this.tableData = tableData;
    }
    
  }

}
