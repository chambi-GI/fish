import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buyer-login',
  standalone: false,
  templateUrl: './buyer-login.component.html',
  styleUrl: './buyer-login.component.scss'
})
export class BuyerLoginComponent {
  buyer_selected:boolean=false
  seller_selected:boolean=false;
  constructor( private modalService: NgbModal, ){}
 
  ngOnInit(): void {
  this.buyer_selection();
  }
  buyer_selection(){
    this.buyer_selected=true;
    this.seller_selected=false
  }
  seller_selection(){
    this.buyer_selected=false;
    this.seller_selected=true
  }

  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }
}
