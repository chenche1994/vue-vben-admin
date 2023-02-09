export interface OrgTreeParams {
  rootOrgId?: string
}

export interface OrgDelParams {
  id: string
  enableCascade?: string // 存在下级不允许删除
}

export interface OrgInfo {
  parentId?: string
  name: string
  memo?: string
  phone?: string // 固定电话
  charger?: string // 负责人
  mobile?: string // 移动电话
  specialtyId?: string //专业id
}
