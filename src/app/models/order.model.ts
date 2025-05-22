export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OrderCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
  };
  price: number;
  quantity: number;
  total: number;
}

export interface PaymentMethod {
  type: string;
  details: {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    transactionId?: string;
  };
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderFilters {
  status?: OrderStatus;
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  notes?: string;
} 