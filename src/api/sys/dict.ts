import { defHttp } from '/@/utils/http/axios'

enum Api {
  Create = '/custom-config/create',
  Delete = '/custom-config/delete',
  Get = '/custom-config/get',
  GetByKey = '/custom-config/get-by-key',
  List = '/custom-config/list',
  Update = '/custom-config/updadte',
}

export function apiDelDict() {
  return defHttp.post({ url: Api.Delete })
}

export function apiGetDictList() {
  return defHttp.post({ url: Api.List })
}

export function apiGetDictByKey() {
  return defHttp.post({ url: Api.GetByKey })
}

/**
 * 保存或者更新部门角色
 */
export const saveOrUpdateDict = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: Api.Update, params })
  } else {
    return defHttp.post({ url: Api.Create, params })
  }
}
