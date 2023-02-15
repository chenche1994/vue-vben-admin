import { defHttp } from '/@/utils/http/axios'

enum Api {
  Create = '/custom-config/create',
  Delete = '/custom-config/delete',
  Get = '/custom-config/get',
  GetByKey = '/custom-config/get-by-key',
  List = '/custom-config/list',
  Update = '/custom-config/updadte',
}

export function apiDelDict(params) {
  return defHttp.post({ url: Api.Delete, params })
}

export function apiGetDictList(params) {
  return defHttp.post({ url: Api.List, params })
}

export function apiGetDictByKey(params) {
  return defHttp.post({ url: Api.GetByKey, params })
}

/**
 * 保存或者更新
 */
export const saveOrUpdateDict = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: Api.Update, params })
  } else {
    return defHttp.post({ url: Api.Create, params })
  }
}
