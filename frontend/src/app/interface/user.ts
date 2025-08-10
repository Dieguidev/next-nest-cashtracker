export interface User {
  id: string;
  name: string;
  email: string;
  token: null;
  confirmed: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
