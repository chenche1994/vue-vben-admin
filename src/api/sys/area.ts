import { defHttp } from '/@/utils/http/axios'
import { AreaInfo } from './model/areaModel'
import { useApiDelete } from '/@/hooks/component/useApiConfirm'
export enum AreaApi {
  Create = '/area/create',
  Delete = '/area/delete',
  Tree = '/area/tree',
  Update = '/area/update',
  getInfo = '/area/get',
  ImportArea = '/area/import',
  Replicate = '/area/replicate',
  List = '/area/list',
  exportXlsUrl = '/area/export',
}

export function apiGetAreaTree(params?) {
  return defHttp.post({ url: AreaApi.Tree, params })
}
export function apiDelArea(params, confirm = true) {
  return useApiDelete(defHttp.post({ url: AreaApi.Delete, params }), confirm)
}
export function apiGetAreaList(params) {
  return defHttp.post({ url: AreaApi.List, params })
}
/**
 * 保存或者更新
 */
export const saveOrUpdateArea = (params: AreaInfo, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: AreaApi.Update, params })
  } else {
    return defHttp.post({ url: AreaApi.Create, params })
  }
}
