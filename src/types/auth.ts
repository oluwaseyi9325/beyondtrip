export interface AuthStore {
  isLoggedIn: boolean;
  token: string | null;
  role: string | null;
  profile: any;
  handleLogin: (data: any) => void;
  updateProfile: (data: any) => void;
  handleLogout: () => void;
}

export interface TLogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface TLoginSchema {
  emailAddress: string;
  password: string;
}

export interface TRegister {
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber?: string;
  registrationCode: string;
  userRole: string;
  password: string;
}
