import { defHttp } from '/@/utils/http/axios'

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
