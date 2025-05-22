import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { AccountListService } from './account-list.service';
import { DecimalPipe } from '@angular/common';

import { Table } from './account-list.model';
import { tableData } from './data';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
  providers: [AccountListService, DecimalPipe]
})

/**
 * Account Orders Component
 */
export class AccountOrdersComponent implements OnInit {
  
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  public isCollapsed = true;

  constructor(public service: AccountListService,private modalService: NgbModal) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  /**
   * Size Chart Modal
   * @param ordertDetailModal scroll modal data
   */
   orderModal(ordertDetailModal: any) {
    this.modalService.open(ordertDetailModal, { size: 'lg', centered: true });
  }

}
