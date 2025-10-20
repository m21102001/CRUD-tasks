export interface GetAlluserModel {
  page: number,
  limit: number,
  name: string,
}
export interface userModel {
  email: string,
  password: string,
  username: string,
  role: string
}
export interface UpdateUserStatusModel {
  id: string,
  status: string
}