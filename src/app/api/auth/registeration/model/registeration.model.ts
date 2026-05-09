interface IEmailVerification {
  email: string;
}

interface IOtpVerification {
  email: string;
  code: string;
}

interface IRegistration {
  username: string,
  email: string,
  password?: string,
  confirmPassword?: string,
  firstName: string,
  lastName: string,
  phone: string
}
