<template>
  <a-card :bordered="false" style="height: 100%">
    <div class="j-table-operator" style="width: 100%">
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAddDepart"
        >新增</a-button
      >
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAddChildDepart()"
        >新增子级</a-button
      >
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAddPost()"
        >添加职务</a-button
      >
      <a-upload name="file" :showUploadList="false" :customRequest="onImportXls">
        <a-button type="primary" preIcon="ant-design:import-outlined" style="margin-left: 8px"
          >导入</a-button
        >
      </a-upload>
      <a-button @click="onDelete">删除</a-button>
      <template v-if="checkedKeys.length > 0">
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="onDeleteBatch">删除</a-menu-item>
            </a-menu>
          </template>
          <a-button> 批量操作 </a-button>
        </a-dropdown>
      </template>
    </div>
    <a-alert type="info" show-icon class="alert" style="margin-bottom: 8px">
      <template #message>
        <template v-if="checkedKeys.length > 0">
          <span>已选中 {{ checkedKeys.length }} 条记录</span>
          <a-divider type="vertical" />
          <a @click="checkedKeys = []">清空</a>
        </template>
        <template v-else>
          <span>{{ currentDepart?.name || '未选中' }}</span>
        </template>
      </template>
    </a-alert>
    <a-spin :spinning="loading">
      <a-input-search
        placeholder="按部门名称搜索…"
        style="margin-bottom: 10px"
        v-model:value="searchKeyword"
      />
      <!--组织机构树-->
      <template v-if="treeData.length > 0">
        <a-tree
          v-if="!treeReloading"
          :clickRowToExpand="false"
          :treeData="treeData"
          :selectedKeys="selectedKeys"
          :checkStrictly="checkStrictly"
          :checkedKeys="checkedKeys"
          :fieldNames="{ key: 'uid', title: 'name', children: 'subList' }"
          v-model:expandedKeys="expandedKeys"
          @check="onCheck"
          @select="onSelect"
        />
      </template>
      <a-empty v-else description="暂无数据" />
    </a-spin>
    <DepartFormModal
      :rootTreeData="treeData"
      @register="registerModal"
      @success="loadRootTreeData"
    />
    <PostFormModal
      :rootTreeData="treeData"
      @register="registerPostModal"
      @success="loadRootTreeData"
    />
  </a-card>
</template>

<script lang="ts" setup>
  import { nextTick, ref, unref, defineExpose, watch } from 'vue'
  import { useModal } from '/@/components/Modal'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { apiGetOrgDutyTree, apiDelOrg, apiDelPost } from '/@/api'
  import DepartFormModal from './DepartFormModal.vue'
  import PostFormModal from './PostFormModal.vue'
  import { orgCategory } from '../dept.data'

  const emit = defineEmits(['select', 'rootTreeData'])
  const { createMessage } = useMessage()

  const loading = ref<boolean>(false)
  // 部门树列表数据
  const treeData = ref<any[]>([])

  // 当前选中的项
  const checkedKeys = ref<any[]>([])
  // 当前展开的项
  const expandedKeys = ref<any[]>([])
  // 当前选中的项
  const selectedKeys = ref<any[]>([])
  // 树组件重新加载
  const treeReloading = ref<boolean>(false)
  // 树父子是否关联
  const checkStrictly = ref<boolean>(true)
  // 当前选中的部门
  const currentDepart = ref<any>(null)

  // 搜索关键字
  const searchKeyword = ref('')

  const getParentKey = (key: string | number, tree): string | number | undefined => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }
  watch(searchKeyword, (value) => {
    const expanded = treeData.value
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData.value)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    expandedKeys.value = expanded
    searchKeyword.value = value
    // autoExpandParent.value = true
  })
  // 注册部门 modal
  const [registerModal, { openModal }] = useModal()
  // 注册职务modal
  const [registerPostModal, { openModal: openPostModal }] = useModal()
  // 加载顶级部门信息
  async function loadRootTreeData() {
    try {
      loading.value = true
      treeData.value = []
      const result = await apiGetOrgDutyTree()
      if (Array.isArray(result)) {
        treeData.value = result
      } else {
        treeData.value = [result]
      }
      if (expandedKeys.value.length === 0) {
        autoExpandParentNode()
      } else {
        if (selectedKeys.value.length === 0) {
          let item = treeData.value[0]
          if (item) {
            // 默认选中第一个
            setSelectedKey(item.uid, item)
          }
        } else {
          emit('select', currentDepart.value)
        }
      }
      emit('rootTreeData', treeData.value)
    } finally {
      loading.value = false
    }
  }

  loadRootTreeData()

  // 自动展开父节点，只展开一级
  function autoExpandParentNode() {
    let item = treeData.value[0]
    if (item) {
      if (!item.isLeaf) {
        expandedKeys.value = [item.uid]
      }
      // 默认选中第一个
      setSelectedKey(item.uid, item)
      reloadTree()
    } else {
      emit('select', null)
    }
  }

  // 重新加载树组件，防止无法默认展开数据
  async function reloadTree() {
    await nextTick()
    treeReloading.value = true
    await nextTick()
    treeReloading.value = false
  }

  /**
   * 设置当前选中的行
   */
  function setSelectedKey(key: string, data?: object) {
    selectedKeys.value = [key]
    if (data) {
      currentDepart.value = data
      emit('select', data)
    }
  }

  // 添加一级部门
  function onAddDepart() {
    openModal(true, { isUpdate: false, isChild: false })
  }

  // 添加子级部门
  function onAddChildDepart(data = currentDepart.value) {
    if (data == null) {
      createMessage.warning('请先选择一个部门')
      return
    }
    const record = { parentId: data.id }
    openModal(true, { isUpdate: false, isChild: true, record })
  }

  // 添加职务
  function onAddPost(data = currentDepart.value) {
    if (data == null) {
      createMessage.warning('请先选择一个部门')
      return
    }
    const record = { parentId: data.id }
    openPostModal(true, { record })
  }
  // 树复选框选择事件
  function onCheck(e) {
    if (Array.isArray(e)) {
      checkedKeys.value = e
    } else {
      checkedKeys.value = e.checked
    }
  }

  // 树选择事件
  function onSelect(selKeys, event) {
    if (selKeys.length > 0 && selectedKeys.value[0] !== selKeys[0]) {
      setSelectedKey(selKeys[0], event.selectedNodes[0])
    } else {
      // 这样可以防止用户取消选择
      setSelectedKey(selectedKeys.value[0])
    }
  }

  /**
   * 根据 ids 删除部门
   * @param idListRef array
   * @param confirm 是否显示确认提示框
   */
  async function doDeleteDepart(idListRef, confirm = true) {
    const idList = unref(idListRef)
    if (idList.length > 0) {
      try {
        loading.value = true
        const orgIdList = idList.filter((v) => v.indexOf('O'))
        const dutyIdList = idList.filter((v) => v.indexOf('D'))
        if (orgIdList) {
          await apiDelOrg({ idList: orgIdList }, confirm)
        }
        if (dutyIdList.length) {
          await apiDelPost({ idList: dutyIdList }, confirm)
        }
        await loadRootTreeData()
      } finally {
        loading.value = false
      }
    }
  }

  // 删除单个部门
  async function onDelete() {
    try {
      loading.value = true
      const api = currentDepart.value?.type === orgCategory.ORGANIZATION ? apiDelOrg : apiDelPost
      const params =
        currentDepart.value?.type === orgCategory.ORGANIZATION
          ? { idList: [currentDepart.value.id] }
          : { id: currentDepart.value.id }
      await api(params)
      selectedKeys.value = []
      await loadRootTreeData()
    } finally {
      loading.value = false
    }
  }

  // 批量删除部门
  async function onDeleteBatch() {
    try {
      await doDeleteDepart(checkedKeys)
      checkedKeys.value = []
    } finally {
    }
  }

  function onImportXls() {}
  defineExpose({
    loadRootTreeData,
  })
</script>
