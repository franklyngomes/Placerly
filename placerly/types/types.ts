export interface SignupData{
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  password: string,
}
export interface SigninData{
  email: string,
  password: string,
}
export interface VerifyEmailData{
  email: string,
  code: string,
}
export interface ForgotPasswordData{
  email: string,
}
export interface ResetPasswordData{
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
  transition?:unknown; 
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