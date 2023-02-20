<template>
  <a-card :bordered="false" style="height: 100%">
    <div class="j-table-operator" style="width: 100%">
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAddCategory"
        >新增</a-button
      >
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAddChildCategory()"
        >新增子级</a-button
      >
      <a-upload name="file" :showUploadList="false" :customRequest="onImportXls">
        <a-button type="primary" preIcon="ant-design:import-outlined" style="margin-left: 8px"
          >导入</a-button
        >
      </a-upload>
      <a-button type="primary" preIcon="ant-design:delete-outlined" @click="onDelete"
        >删除</a-button
      >
    </div>
    <a-alert type="info" show-icon class="alert" style="margin-bottom: 8px">
      <template #message>
        <template v-if="checkedKeys.length > 0">
          <span>已选中 {{ checkedKeys.length }} 条记录</span>
          <a-divider type="vertical" />
          <a @click="checkedKeys = []">清空</a>
        </template>
        <template v-else>
          <span>{{ currentCategory?.name || '未选中' }}</span>
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
          :fieldNames="{ key: 'id', title: 'name', children: 'subList' }"
          v-model:expandedKeys="expandedKeys"
          @check="onCheck"
          @select="onSelect"
        />
      </template>
      <a-empty v-else description="暂无数据" />
    </a-spin>
    <CategoryFormModal @register="registerModal" @success="loadRootTreeData" />
  </a-card>
</template>

<script lang="ts" setup>
  import { nextTick, ref, defineExpose, watch } from 'vue'
  import { useModal } from '/@/components/Modal'
  import { useMessage } from '/@/hooks/web/useMessage'
  import CategoryFormModal from './CategoryFormModal.vue'
  import { Api, apiGetAssetCategoryTree, apiDelAssetCategory } from '../assetCategory.api'
  import { useMethods } from '/@/hooks/system/useMethods'
  const emit = defineEmits(['select', 'rootTreeData'])
  const { createMessage } = useMessage()
  const { handleImportXls } = useMethods()
  const loading = ref<boolean>(false)
  // 树列表数据
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
  // 当前选中的资产类目
  const currentCategory = ref<any>(null)
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
        console.log(item)

        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.key, treeData.value)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    expandedKeys.value = expanded
    searchKeyword.value = value
    // autoExpandParent.value = true
  })
  // 注册modal
  const [registerModal, { openModal }] = useModal()

  // 加载顶级树
  async function loadRootTreeData() {
    try {
      loading.value = true
      treeData.value = []
      const data = await apiGetAssetCategoryTree({})
      if (Array.isArray(data)) {
        treeData.value = data
      } else {
        treeData.value = [data]
      }
      if (expandedKeys.value.length === 0) {
        autoExpandParentNode()
      } else {
        if (selectedKeys.value.length === 0) {
          let item = treeData.value[0]
          if (item) {
            // 默认选中第一个
            setSelectedKey(item.id, item)
          }
        } else {
          emit('select', currentCategory.value)
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
        expandedKeys.value = [item.id]
      }
      // 默认选中第一个
      setSelectedKey(item.id, item)
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
      currentCategory.value = data
      emit('select', data)
    }
  }

  // 添加一级节点
  function onAddCategory() {
    openModal(true, { isUpdate: false, isChild: false })
  }

  // 添加子级节点
  function onAddChildCategory(data = currentCategory.value) {
    if (data == null) {
      createMessage.warning('请先选择一个部门')
      return
    }
    const record = { parentId: data.id }
    openModal(true, { isUpdate: false, isChild: true, record })
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
    console.log('select: ', selKeys, event)
    if (selKeys.length > 0 && selectedKeys.value[0] !== selKeys[0]) {
      setSelectedKey(selKeys[0], event.selectedNodes[0])
    } else {
      // 这样可以防止用户取消选择
      setSelectedKey(selectedKeys.value[0])
    }
  }

  /**
   * 批量删除
   * @param idListRef array
   * @param confirm 是否显示确认提示框
   */
  async function onDelete(confirm = true) {
    try {
      loading.value = true
      await apiDelAssetCategory({ idList: currentCategory.value.id }, confirm)
      await loadRootTreeData()
    } finally {
      loading.value = false
    }
  }

  function onImportXls(d) {
    handleImportXls(d, Api.importUrl, () => {
      loadRootTreeData()
    })
  }
  defineExpose({
    loadRootTreeData,
  })
</script>
