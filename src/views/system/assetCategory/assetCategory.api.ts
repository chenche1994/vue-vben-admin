// TODO: ts改造
import { defHttp } from '/@/utils/http/axios'
import { useApiDelete } from '/@/hooks/component/useApiConfirm'
export enum Api {
  Create = '/asset-category/create',
  Delete = '/asset-category/delete',
  Tree = '/asset-category/tree',
  Update = '/asset-category/update',
  List = '/asset-category/list',
  importUrl = '/basic-api/asset-category/import',
}

/**
 * @description: getOrg
 */
export function apiGetAssetCategoryTree(params) {
  return defHttp.post({ url: Api.Tree, params })
}
export function apiGetAssetCategorList(params) {
  return defHttp.post({ url: Api.List, params })
}

export function apiDelAssetCategory(params, confirm = true) {
  return useApiDelete(() => defHttp.post({ url: Api.Delete, params }), confirm)
}

/**
 * 保存或者更新
 */
export const saveOrUpdateAssetCategory = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: Api.Update, params })
  } else {
    return defHttp.post({ url: Api.Create, params })
  }
}
