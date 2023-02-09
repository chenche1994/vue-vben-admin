/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
}

export interface SearchUserParams {
  mobileLike?: string
  pageIndex: number
  pageSize: number
  realNameLike?: string
  roleId?: string | number
  status?: string
  userNameLike?: string
  userNickLike?: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number
  token: string
  role: RoleInfo
  access_token: string
  refresh_token: string
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roleList: RoleInfo[]
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 真实名字
  realName: string
  // 头像
  avatar: string
  // 介绍
  desc?: string
}
