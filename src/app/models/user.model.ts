export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  roles: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
} 