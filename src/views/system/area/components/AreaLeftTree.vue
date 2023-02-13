<template>
  <a-card :bordered="false" style="height: 100%" class="!m-4 !mr-0 w-1/4 xl:w-2/5">
    <div class="j-table-operator" style="width: 100%">
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAddArea">新增</a-button>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onCopyArea()"
        >复制</a-button
      >
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onEditArea()"
        >编辑</a-button
      >
      <a-upload name="file" :showUploadList="false" :customRequest="onImportXls">
        <a-button type="primary" preIcon="ant-design:import-outlined">导入</a-button>
      </a-upload>
      <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"
        >导出</a-button
      >
      <template v-if="checkedKeys.length > 0">
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="onDeleteBatch">删除 </a-menu-item>
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
          <span>{{ currentArea?.name || '未选中' }}</span>
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
          checkable
          :clickRowToExpand="false"
          :treeData="treeData"
          :selectedKeys="selectedKeys"
          :checkStrictly="checkStrictly"
          :checkedKeys="checkedKeys"
          :fieldNames="{ key: 'id', title: 'name', children: 'subList' }"
          v-model:expandedKeys="expandedKeys"
          @check="onCheck"
          @select="onSelect"
        >
          <template #title="{ key: treeKey, name, dataRef }">
            <a-dropdown :trigger="['contextmenu']">
              <Popconfirm
                :visible="visibleTreeKey === treeKey"
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                placement="rightTop"
                @confirm="onDelete(dataRef)"
                @visible-change="onVisibleChange"
              >
                <span>{{ name }}</span>
              </Popconfirm>

              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="onAddChildArea(dataRef)">添加子级</a-menu-item>
                  <a-menu-item key="2" @click="visibleTreeKey = treeKey">
                    <span style="color: red">删除</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tree>
      </template>
      <a-empty v-else description="暂无数据" />
    </a-spin>
    <AreaFormModal :rootTreeData="treeData" @register="registerModal" @success="loadRootTreeData" />
  </a-card>
</template>

<script lang="ts" setup>
  import { nextTick, ref, unref, defineExpose, watch } from 'vue'
  import { useModal } from '/@/components/Modal'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useMethods } from '/@/hooks/system/useMethods'
  import { apiGetAreaTree, apiDelArea, AreaApi, apiCopyArea } from '/@/api/sys/area'
  import AreaFormModal from './AreaModal.vue'
  import { Popconfirm } from 'ant-design-vue'

  const emit = defineEmits(['select', 'rootTreeData'])
  const { createMessage } = useMessage()

  const { handleImportXls, handleExportXls } = useMethods()
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
  const currentArea = ref<any>(null)
  // 控制确认删除提示框是否显示
  const visibleTreeKey = ref<any>(null)
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
  // 注册 modal
  const [registerModal, { openModal }] = useModal()

  // 加载顶级部门信息
  async function loadRootTreeData() {
    try {
      loading.value = true
      treeData.value = []
      const result = await apiGetAreaTree()
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
            setSelectedKey(item.id, item)
          }
        } else {
          emit('select', currentArea.value)
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
      currentArea.value = data
      emit('select', data)
    }
  }

  // 添加一级部门
  function onAddArea() {
    openModal(true, { isUpdate: false, isChild: false })
  }

  // 添加子级部门
  function onAddChildArea(data = currentArea.value) {
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
   * 根据 ids 删除部门
   * @param idListRef array
   * @param confirm 是否显示确认提示框
   */
  async function doDeleteArea(idListRef, confirm = true) {
    const idList = unref(idListRef)
    if (idList.length > 0) {
      try {
        loading.value = true
        await apiDelArea({ id: idList }, confirm)
        await loadRootTreeData()
      } finally {
        loading.value = false
      }
    }
  }

  // 删除单个部门
  async function onDelete(data) {
    if (data) {
      onVisibleChange(false)
      doDeleteArea(data.id, false)
    }
  }

  // 批量删除部门
  async function onDeleteBatch() {
    try {
      await doDeleteArea(checkedKeys)
      checkedKeys.value = []
    } finally {
    }
  }

  function onVisibleChange(visible) {
    if (!visible) {
      visibleTreeKey.value = null
    }
  }

  // 导入
  function onImportXls(d) {
    handleImportXls(d, AreaApi.ImportArea, () => {
      loadRootTreeData()
    })
  }

  // 导出
  function onExportXls() {
    handleExportXls('区域', AreaApi.exportXlsUrl)
  }

  // 复制
  async function onCopyArea(data = currentArea.value) {
    if (data == null) {
      createMessage.warning('请先选择一个部门')
      return
    }
    await apiCopyArea({ id: data.id })
    loadRootTreeData()
  }

  // 编辑
  function onEditArea(data = currentArea.value) {
    openModal(true, {
      record: data,
      isUpdate: true,
    })
  }

  defineExpose({
    loadRootTreeData,
  })
</script>
