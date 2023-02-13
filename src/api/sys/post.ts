// TODO: ts改造
import { defHttp } from '/@/utils/http/axios'
import { SearchPostParams } from './model/postModel'
import { useApiDelete } from '/@/hooks/component/useApiConfirm'
enum Api {
  Create = '/post/create',
  Delete = '/post/delete',
  Update = '/post/update',
  List = '/post/list',
}

/**
 * @description: getPost
 */
export function apiGetPostList(params: SearchPostParams) {
  return defHttp.post({ url: Api.List, params })
}

export function apiDelPost(params, confirm = true) {
  return useApiDelete(() => defHttp.post({ url: Api.Delete, params }), confirm)
}

/**
 * 保存或者更新部门角色
 */
export const saveOrUpdatePost = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.post({ url: Api.Update, params })
  } else {
    return defHttp.post({ url: Api.Create, params })
  }
}
