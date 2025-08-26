export interface SignupData {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  password: string,
}
export interface SigninData {
  email: string,
  password: string,
}
export interface VerifyEmailData {
  email: string,
  code: string,
}
export interface ForgotPasswordData {
  email: string,
}
export interface ResetPasswordData {
  email: string,
  code: string,
  newPassword: string
}
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string,
  email: string;
  password: string;
  verified: boolean;
  assets?: unknown;
  debts?: unknown;
  insurance?: unknown;
  transition?: unknown;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  deletedAt?: null;
}
export interface StoreState {
  userid: string | null;
  setUserId: (value: string) => void;
  user: UserProfile | null;
  setUser: (value: UserProfile) => void
}
export interface AssetItem {
  accountName: string,
  accountNumber: string,
  balance: number,
  createdAt?: string,
  provider: string,
  type: string,
  updatedAt?: string,
  userId?: string,
  __v: number,
  _id: string,
}
export interface AssetResponse {
  data?: AssetItem[],
  error?: boolean,
  message?: string
}
export interface AssetFormProps {
  accountName: string,
  accountNumber: string,
  balance?: number,
  provider: string,
  type: string,
  userId: string,
}
export interface DebtItem {
  accountName: string,
  accountNumber: string,
  createdAt: string,
  dueDate: string,
  outstandingAmount: number,
  provider: string,
  type: string,
  updatedAt?: string,
  userId: string,
  __v?: number,
  _id: string,
}
export interface DebtResponse {
  data?: DebtItem[],
  error?: boolean,
  message?: string,
}
export interface DebtFormProps {
  accountName?: string,
  accountNumber?: string,
  outstandingAmount?: number,
  provider?: string,
  type: string,
  userId: string,
}
export interface InsuranceItem {
  coverageAmount: number,
  createdAt: string,
  policyNumber: string,
  premium: number,
  provider: string,
  type: string,
  updatedAt: string,
  userId: string,
  __v: number,
  _id: string,
}
export interface InsuranceResponse {
  data?: InsuranceItem[],
  error?: boolean,
  message: string,
}
export interface InsuranceFormProps {
  coverageAmount: number | string,
  policyNumber: string,
  premium?: number | string,
  provider: string,
  type: string,
  userId: string,
}
export interface UtilityItem {
  accountNumber: string,
  billingCycle: string,
  createdAt?: string,
  outstandingBill: number,
  provider: string,
  type: string,
  updatedAt?: string,
  userId: string,
  __v?: number,
  _id: string,
}
export interface UtilityResponse {
  data?: UtilityItem[],
  error?: boolean,
  message?: string
}
export interface UtilityFormProps {
  accountNumber: string,
  billingCycle: string,
  outstandingBill?: number | string,
  provider: string,
  type: string,
  userId: string,
}
export interface TransitionItem {
  createdAt: string,
  email: string,
  name: string,
  phone: string,
  type: string,
  userId: string,
  __v: number,
  _id: string,
}
export interface TransitionResponse{
  data?: TransitionItem[],
  error?:boolean,
  message: string
}
export interface TransitionFormProps{
  email: string,
  name: string,
  phone: string,
  type: string,
  userId: string,
}