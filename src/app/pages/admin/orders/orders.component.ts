import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../../services/orders/orders.service';
import { Order, OrderStatus, OrderFilters, UpdateOrderStatusDto } from '../../../models/order.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  showFilters = false;
  filters: OrderFilters = {};
  selectedOrder: Order | null = null;
  statusForm!: FormGroup;
  filtersForm!: FormGroup;
  statistics = {
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    refundedOrders: 0
  };

  readonly OrderStatus = OrderStatus;

  constructor(
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.initStatusForm();
    this.initFiltersForm();
  }

  ngOnInit(): void {
    this.loadOrders();
    this.loadStatistics();
  }

  initStatusForm() {
    this.statusForm = this.fb.group({
      status: ['', Validators.required],
      trackingNumber: [''],
      estimatedDelivery: [''],
      notes: ['']
    });
  }

  initFiltersForm() {
    this.filtersForm = this.fb.group({
      status: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  loadOrders() {
    this.loading = true;
    this.ordersService.getOrders(this.filters).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load orders');
        this.loading = false;
      }
    });
  }

  loadStatistics() {
    this.ordersService.getOrderStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
      },
      error: (error) => {
        this.toastr.error('Failed to load order statistics');
      }
    });
  }

  openOrderDetails(content: any, order: Order) {
    this.selectedOrder = order;
    this.statusForm.patchValue({
      status: order.status,
      trackingNumber: order.trackingNumber || '',
      estimatedDelivery: order.estimatedDelivery || '',
      notes: order.notes || ''
    });
    this.modalService.open(content, { size: 'lg' });
  }

  updateOrderStatus() {
    if (this.statusForm.invalid || !this.selectedOrder) return;

    const updateDto: UpdateOrderStatusDto = this.statusForm.value;
    this.loading = true;

    this.ordersService.updateOrderStatus(this.selectedOrder.id, updateDto).subscribe({
      next: (updatedOrder) => {
        this.toastr.success('Order status updated successfully');
        this.modalService.dismissAll();
        this.loadOrders();
        this.loadStatistics();
      },
      error: (error) => {
        this.toastr.error('Failed to update order status');
        this.loading = false;
      }
    });
  }

  applyFilters() {
    if (this.filtersForm.valid) {
      this.filters = this.filtersForm.value;
      this.loadOrders();
      this.showFilters = false;
    }
  }

  resetFilters() {
    this.filtersForm.reset();
    this.filters = {};
    this.loadOrders();
    this.showFilters = false;
  }

  getStatusBadgeClass(status: OrderStatus): string {
    const statusClasses = {
      [OrderStatus.PENDING]: 'bg-warning',
      [OrderStatus.CONFIRMED]: 'bg-info',
      [OrderStatus.PROCESSING]: 'bg-primary',
      [OrderStatus.SHIPPED]: 'bg-info',
      [OrderStatus.DELIVERED]: 'bg-success',
      [OrderStatus.CANCELLED]: 'bg-danger',
      [OrderStatus.REFUNDED]: 'bg-secondary'
    };
    return statusClasses[status] || 'bg-secondary';
  }

  getStatusLabel(status: OrderStatus): string {
    return status.charAt(0) + status.slice(1).toLowerCase();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
} 