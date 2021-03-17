export interface UserModel {
  email: string;
  password?: string;
  name?: string;
  google?: boolean;
  facebook?: boolean;
  displayName?: string;
  organization?: string;
  uid: string;
  lastLoginAt?:string;
  emailVerified: boolean;
  refreshToken?: string;
  photoURL?: string;
  role?: Roles;
  rememberme?: boolean;
  url?:string;
  type?:string;
}
export type Roles = 'SUSCRIPTOR' | 'EDITOR' | 'ADMIN';