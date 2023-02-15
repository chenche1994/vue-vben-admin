import { defHttp } from '/@/utils/http/axios'

enum Api {
  Create = '/form/create',
  Delete = '/form/datasource',
  Deploy = '/form/deploy',
  Update = '/form/update',
}

export function apiCreateForm(params) {
  return defHttp.post({ url: Api.Create, params })
}
