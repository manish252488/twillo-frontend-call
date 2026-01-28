// interfacesm types and enums

export enum WorkflowType {
  SUPPORT = 'Support',
  SALES = 'Sales',
  REMINDER = 'Reminder',
}

export enum CallStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Call {
  id: number;
  customerName: string;
  phoneNumber: string;
  workflow: WorkflowType;
  status: CallStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCallRequest {
  customerName: string;
  phoneNumber: string;
  workflow: WorkflowType;
}

export interface UpdateCallStatusRequest {
  status: CallStatus;
}

