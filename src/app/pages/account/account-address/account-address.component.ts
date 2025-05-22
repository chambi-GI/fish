import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { AccountListService } from './account-address.service';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Sweet Alert
import Swal from 'sweetalert2';

import { Table } from './account-address.model';
import { tableData } from './data';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss'],
  providers: [AccountListService, DecimalPipe]
})

/**
 * Account Address Component
 */
export class AccountAddressComponent implements OnInit {

  tables$: Observable<Table[]>;
  total$: Observable<number>;
  public isCollapsed = true;

  // Form Submit
  userForm!: UntypedFormGroup;
  submitted = false;
  tableData!: Table[];

  constructor(private modalService: NgbModal,public service: AccountListService,private formBuilder: UntypedFormBuilder) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.tableData = tableData;

    // this.tables$.subscribe(x => {
    //   this.tableData =  Object.assign([], x);   
    // });

    /**
     * Form Validation
     */
     this.userForm = this.formBuilder.group({
      ids: [''],
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      company: ['',],
      plot_no: ['',],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      line1: ['', [Validators.required]],
      line2: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
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
      if (this.userForm.get('ids')?.value) {     
        this.tableData = this.tableData.map((data: { id: any; }) => data.id === this.userForm.get('ids')?.value ? { ...data, ...this.userForm.value } : data)        
      }else{
      const f_name = this.userForm.get('f_name')?.value;
      const l_name = this.userForm.get('l_name')?.value;
      const country = this.userForm.get('country')?.value;
      const city = this.userForm.get('city')?.value;
      const line1 = this.userForm.get('line1')?.value;
      const line2 = this.userForm.get('line2')?.value;
      const zip_code = this.userForm.get('zip_code')?.value;
      const company = '';
      const plot_no = '769';

      this.tableData.push({
        id: this.tableData.length + 1,
        f_name,
        l_name,
        company,
        plot_no,
        country,
        city,
        line1,
        line2,
        zip_code
      })
    }
    this.modalService.dismissAll();
    this.userForm.reset();
    }
    this.submitted = true;    
  }

  /**
   * Open modal
   * @param content modal content
   */
   singleData:any;
   editModal(content: any,id:any) {
     this.singleData = this.tableData[id];    
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });    
    this.userForm.controls['f_name'].setValue(this.singleData.f_name);
    this.userForm.controls['country'].setValue(this.singleData.country);
    this.userForm.controls['company'].setValue(this.singleData.company);
    this.userForm.controls['plot_no'].setValue(this.singleData.plot_no);
    this.userForm.controls['country'].setValue(this.singleData.country);
    this.userForm.controls['city'].setValue(this.singleData.city);
    this.userForm.controls['line1'].setValue(this.singleData.line1);
    this.userForm.controls['line2'].setValue(this.singleData.line2);
    this.userForm.controls['zip_code'].setValue(this.singleData.zip_code);
    this.userForm.controls['ids'].setValue(this.singleData.id);
  }

  // Remove Data
  removeData(e:any){
    Swal.fire({
      title: 'Are you Sure ?',
      text: 'Are you Sure You want to Remove this Product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        Swal.fire({title: 'Deleted!', text:'Your file has been deleted.', confirmButtonColor: '#364574',icon: 'success',});
        e.target.closest('tr').remove();
      }
    });
  }

}
