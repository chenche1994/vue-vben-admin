import { defHttp, otherHttp } from '/@/utils/http/axios'
import {
  LoginParams,
  SearchUserParams,
  LoginResultModel,
  GetUserInfoModel,
} from './model/userModel'

import { useApiDelete } from '/@/hooks/component/useApiConfirm'
import { ErrorMessageMode } from '/#/axios'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/auth/info',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  thirdLogin = '/sys/thirdLogin/getLoginUser',
  GetUserList = '/user/list',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout })
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  )
}

export function apiGetUserList(params: SearchUserParams) {
  return defHttp.post({ url: Api.GetUserList, params })
}
/**
 * @description: 第三方登录
 */
export function thirdLogin(params, mode: ErrorMessageMode = 'modal') {
  return otherHttp.get<LoginResultModel>(
    {
      url: `/oauth/token?grant_type=authorization_code&client_id=tpm&client_secret=abcd1234&code=${params.code}&redirect_uri=https://localhost:3100/#/`, // `${Api.thirdLogin}/${params.token}/${params.thirdType}`,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * 保存或者更新
 */
export const saveOrUpdateUser = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: '/user/update', params })
  } else {
    return defHttp.post({ url: '/user/create', params })
  }
}

/**
 * 删除
 */
export const apiDelUser = (params, confirm = true) => {
  return useApiDelete(defHttp.post({ url: '/user/delete', params }), confirm)
}
