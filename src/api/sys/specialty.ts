import { defHttp } from '/@/utils/http/axios'
import { SpecialtyInfo } from './model/specialtyModel'

enum Api {
  Create = '/specialty/create',
  Delete = '/specialty/delete',
  Tree = '/specialty/tree',
  Update = '/specialty/update',
  getInfo = '/specialty/get',
}

export function apiGetSpecialty(params) {
  return defHttp.post({ url: Api.Tree, params })
}
export function apiDelSpecialty(params) {
  return defHttp.post({ url: Api.Delete, params })
}
/**
 * 保存或者更新
 */
export const saveOrUpdateSpecialty = (params: SpecialtyInfo, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: Api.Update, params })
  } else {
    return defHttp.post({ url: Api.Create, params })
  }
}
