import { defHttp, otherHttp } from '/@/utils/http/axios'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'

import { ErrorMessageMode } from '/#/axios'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/auth/info',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  thirdLogin = '/sys/thirdLogin/getLoginUser',
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
