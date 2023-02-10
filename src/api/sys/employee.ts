import { defHttp } from '/@/utils/http/axios'
enum Api {
  Create = '/employee/create',
  Delete = '/employee/delete',
  Detail = '/employee/get',
  Update = '/employee/update',
  List = '/employee/list',
}

/**
 * @description:
 */
export function apiGetEmployeeList(params) {
  return defHttp.post({ url: Api.List, params })
}

export function apiUpdateEmployee(params) {
  return defHttp.post({ url: Api.Update, params })
}

export function apiGetEmployeeInfo(params) {
  return defHttp.post({ url: Api.Detail, params })
}

export function apiCreateEmployee(params) {
  return defHttp.post({ url: Api.Create, params })
}
export function apiDelEmployee(params) {
  return defHttp.post({ url: Api.Delete, params })
}

/**
 * 保存或者更新部门角色
 */
export const saveOrUpdateEmployee = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: Api.Update, params })
  } else {
    return defHttp.post({ url: Api.Create, params })
  }
}
