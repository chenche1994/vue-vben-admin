import type { UserInfo, LoginInfo } from '/#/store'
import type { ErrorMessageMode } from '/#/axios'
import { defineStore } from 'pinia'
import { store } from '/@/store'
import { RoleEnum } from '/@/enums/roleEnum'
import { PageEnum } from '/@/enums/pageEnum'
import {
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  LOGIN_INFO_KEY,
  REFRESH_TOKEN_KEY,
} from '/@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel'
import { doLogout, getUserInfo, loginApi, thirdLogin } from '/@/api/sys/user'
import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'
import { useGlobSetting } from '/@/hooks/setting'
import { router } from '/@/router'
import { usePermissionStore } from '/@/store/modules/permission'
import { RouteRecordRaw } from 'vue-router'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { isArray } from '/@/utils/is'
import { h } from 'vue'
import { useSso } from '/@/hooks/web/useSso'

import { deepMerge } from '/@/utils'
interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
  loginInfo?: Nullable<LoginInfo>
  refreshToken?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // refreshToken
    refreshToken: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    //登录返回信息
    loginInfo: null,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRefreshToken(): string {
      return this.refreshToken || getAuthCache<string>(REFRESH_TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : '' // for null or undefined value
      setAuthCache(TOKEN_KEY, info)
    },
    setRefreshToken(info: string | undefined) {
      this.refreshToken = info ? info : '' // for null or undefined value
      setAuthCache(REFRESH_TOKEN_KEY, info)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setHomePath(config: object) {
      this.userInfo = deepMerge(this.userInfo || {}, config)
      setAuthCache(USER_INFO_KEY, this.userInfo)
    },
    setLoginInfo(info: LoginInfo | null) {
      this.loginInfo = info
      setAuthCache(LOGIN_INFO_KEY, info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.refreshToken = ''
      this.roleList = []
      this.sessionTimeout = false
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const data = await loginApi(loginParams, mode)
        const { token } = data

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean, data?: any): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null
      //获取用户信息
      const userInfo = await this.getUserInfoAction()
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
          permissionStore.setDynamicAddedRoute(true)
        }
        await this.setLoginInfo({ ...data, isLogin: true })
        goHome && (await router.replace((userInfo && userInfo.homePath) || PageEnum.BASE_HOME))
      }
      return data
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      let userInfo = await getUserInfo()
      const { roleList: roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roleList = []
        this.setRoleList([])
      }
      if (!userInfo.homePath) {
        userInfo = deepMerge(userInfo || {}, { homePath: this.getUserInfo.homePath })
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)

      //如果开启单点登录,则跳转到单点统一登录中心
      const openSso = useGlobSetting().openSso
      if (openSso == 'true') {
        await useSso().ssoLoginOut()
      }

      goLogin && router.push(PageEnum.BASE_LOGIN)
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.Tip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true)
        },
      })
    },
    /**
     * 登录事件
     */
    async ThirdLogin(params): Promise<any | null> {
      try {
        const { goHome = true, mode, ...ThirdLoginParams } = params
        const data = await thirdLogin(ThirdLoginParams, mode)
        const { access_token: token, refresh_token } = data
        // save token
        this.setToken(token)
        this.setRefreshToken(refresh_token)

        return this.afterLoginAction(goHome, data)
      } catch (error) {
        this.resetState()
        return Promise.reject(error)
      }
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
