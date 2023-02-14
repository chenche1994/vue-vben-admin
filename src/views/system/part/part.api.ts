import { defHttp } from '/@/utils/http/axios'

export enum Api {
  List = '/asset-category/component/list',
  importUrl = '/basic-api/asset-category/component/import',
}

/**
 * @description:
 */
export function apiGetComponentList(params) {
  return defHttp.post({ url: Api.List, params })
}
