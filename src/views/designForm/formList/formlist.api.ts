import { defHttp } from '/@/utils/http/axios'

enum Api {
  Create = '/form/create',
  Datasource = '/form/datasource',
  Deploy = '/form/deploy',
  Update = '/form/update',
}

export function apiCreateForm(params) {
  return defHttp.post({ url: Api.Create, params })
}

// 表单数据源显示
export function apiGetFormDataSource(params) {
  return defHttp.post({ url: Api.Datasource, params })
}
