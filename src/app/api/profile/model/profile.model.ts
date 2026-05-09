interface IProfile {
  user: IUser
}

interface IUser {
  id: string,
  username: string,
  email: string,
  password?: string,
  confirmPassword?: string,
  firstName: string,
  lastName: string,
  phone: string,
  profilePhoto: string,
  emailVerified: string,
  phoneVerified: string,
  role: string,
}