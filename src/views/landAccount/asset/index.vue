<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <AssetCategoryTree class="m-4 mr-0 w-1/4 xl:w-1/5" @root-tree-data="onRootTreeData" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleCreate">删除</a-button>
        <a-button type="primary" @click="handleCreate">导出</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '查看二维码',
                onClick: handleOpenQr.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AssetQrModal @register="registerQrModal" />
    <AssetModal @register="registerModal" @success="handleSuccess" :rootTreeData="rootTreeData" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { PageWrapper } from '/@/components/Page'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import AssetCategoryTree from './components/assetCategoryTree.vue'
  import AssetQrModal from './components/assetQrModal.vue'
  import AssetModal from './components/assetModal.vue'
  import { useModal } from '/@/components/Modal'
  import { apiGetAssetList, apiDelAsset } from './asset.api'
  import { columns, searchFormSchema } from './asset.data'

  const rootTreeData = ref<any[]>([])
  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '资产列表',
    api: apiGetAssetList,
    columns,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      baseColProps: {
        span: 6,
      },
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
  })
  const [registerModal, { openModal }] = useModal()
  const [registerQrModal, { openModal: openQrModal }] = useModal()
  // 编辑
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    })
  }
  // 删除
  async function handleDelete(record) {
    await apiDelAsset({ id: record.id })
    reload()
  }

  // 新增资产
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    })
  }
  // 刷新表格
  function handleSuccess() {
    reload()
  }
  // 查看二维码
  function handleOpenQr(record) {
    openQrModal(true, { record })
  }
  // 左侧树rootTreeData触发
  function onRootTreeData(data) {
    rootTreeData.value = data
  }
</script>
