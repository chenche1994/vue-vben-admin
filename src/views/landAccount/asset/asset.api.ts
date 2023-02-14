import { defHttp } from '/@/utils/http/axios'
import { useApiDelete } from '/@/hooks/component/useApiConfirm'
export enum Api {
  Create = '/asset/create',
  Delete = '/asset/delete',
  Update = '/asset/update',
  List = '/asset/list',
}

export function apiGetAssetList(params) {
  return defHttp.post({ url: Api.List, params })
}

export function apiDelAsset(params, confirm = true) {
  return useApiDelete(() => defHttp.post({ url: Api.Delete, params }), confirm)
}

/**
 * 保存或者更新
 */
export const saveOrUpdateAsset = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: Api.Update, params })
  } else {
    return defHttp.post({ url: Api.Create, params })
  }
}
