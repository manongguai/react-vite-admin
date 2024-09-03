export interface UserData {
  id: string
  username: string
  phone: string
  email: string
  status: number
  avatar: string
  type: number
  createDate: string
  updateDate: string
}

export interface createUserDto {
  username: string
  phone: string
  email: string
  status: number
  avatar: string
  type: number
  roleIds: string[]
}

export interface updateUserDto extends createUserDto {
  id: string
}
