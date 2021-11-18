export interface RootStateTypes { }

export interface IUser {
  [key: string]: any
}

// user module
export interface UserStateTypes {
  token: string | null
  userInfo: IUser
  roleType: string
  userBtn: any[]
}

export interface AllStateTypes extends RootStateTypes {
  user: UserStateTypes
}
