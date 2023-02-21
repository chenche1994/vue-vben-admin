// 单点登录核心类
import { getToken } from '/@/utils/auth'
import { getUrlParam } from '/@/utils'
import { useGlobSetting } from '/@/hooks/setting'
import { validateCasLogin } from '/@/api/sys/user'
import { useUserStore } from '/@/store/modules/user'
const globSetting = useGlobSetting()
const openSso = globSetting.openSso
export function useSso() {
  /**
   * 单点登录
   */
  async function ssoLogin() {
    if (openSso == 'true') {
      const token = getToken()
      const code = getUrlParam('code')
      if (!token) {
        if (code) {
          await validateCasLogin({
            grant_type: 'authorization_code',
            client_id: 'tpm',
            client_secret: 'abcd1234',
            redirect_uri: 'https://localhost:3100/',
            code,
          }).then((res) => {
            const { access_token: token, refresh_token } = res
            const userStore = useUserStore()
            userStore.setToken(token)
            userStore.setRefreshToken(refresh_token)
            return userStore.afterLoginAction(true, {})
          })
        } else {
          window.location.href =
            globSetting.casBaseUrl +
            '/oauth/authorize?client_id=tpm&response_type=code&redirect_uri=https://localhost:3100/'
          // +
          // encodeURIComponent(locationUrl) +
          // '#'
        }
      }
    }
  }

  /**
   * 退出登录
   */
  async function ssoLoginOut() {
    window.location.href =
      globSetting.casBaseUrl +
      '/oauth/authorize?client_id=tpm&response_type=code&redirect_uri=https://localhost:3100/'
  }
  return { ssoLogin, ssoLoginOut }
}
