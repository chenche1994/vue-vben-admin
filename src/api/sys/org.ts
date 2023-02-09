// TODO: ts改造
import { defHttp } from '/@/utils/http/axios'
import { OrgTreeParams, OrgInfo, OrgDelParams } from './model/orgModel'
import { useApiDelete } from '/@/hooks/component/useApiConfirm'
enum Api {
  Create = '/organization/create',
  Delete = '/organization/delete',
  Tree = '/organization/tree',
  Update = '/organization/update',
}

/**
 * @description: getOrg
 */
export function apiGetOrgTree(params?: OrgTreeParams) {
  return defHttp.post({ url: Api.Tree, params })
}

export function apiDelOrg(params: OrgDelParams, confirm = true) {
  return useApiDelete(defHttp.post({ url: Api.Delete, params }), confirm)
}

/**
 * 保存或者更新部门角色
 */
export const saveOrUpdateOrg = (params: OrgInfo, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: Api.Update, params })
  } else {
    return defHttp.post({ url: Api.Create, params })
  }
}
