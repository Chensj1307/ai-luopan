// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

// Assessment types
export interface Assessment {
  id: string;
  user_id: string;
  industry_code: string;
  occupation_code: string;
  responses: any[];
  result: any;
  created_at: string;
}

// Industry types
export interface Industry {
  code: string;
  name: string;
  replacement_rate: number;
  risk_level: string;
  ai_impact: string;
}

// Occupation types
export interface Occupation {
  code: string;
  name: string;
  tasks: string[];
  ai_risk: string;
}

// Membership types
export interface Membership {
  id: string;
  user_id: string;
  level: string;
  start_date: string;
  end_date: string;
  status: string;
}

// Payment types
export interface PaymentOrder {
  order_no: string;
  user_id: string;
  amount: number;
  status: string;
  payment_method: string;
  created_at: string;
  paid_at: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
