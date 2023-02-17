import { defHttp } from '/@/utils/http/axios'

export enum Api {
  List = '/procedure/list',
  GetElement = '/procedure/element', // 查询流程元素
  Deployment = '/procedure/deployment', // 部署历史
  Deploy = '/procedure/deploy', // 流程部署-上传
}

export function apiGetProcedureList(params) {
  return defHttp.post({ url: Api.List, params })
}

export function apiDeployProcedure(values, params) {
  return defHttp.post({ url: `${Api.Deploy}?key=${values.key}&name=${values.name}`, params })
}
export function apiGetProcedureNode(params) {
  return defHttp.post({ url: Api.GetElement, params })
}
