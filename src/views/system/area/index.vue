<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <AreaLeftTree class="m-4 mr-0 w-1/4 xl:w-1/5" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
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
    <AreaModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script setup>
  import { PageWrapper } from '/@/components/Page'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import AreaLeftTree from './components/AreaLeftTree.vue'
  import AreaModal from './components/AreaModal.vue'
  import { apiGetAreaList, apiDelArea } from '/@/api/index'
  import { columns, searchFormSchema } from './area.data'
  import { useModal } from '/@/components/Modal'
  // 注册表格
  const [registerTable, { reload }] = useTable({
    title: '员工列表',
    api: apiGetAreaList,
    columns,
    actionColumn: {
      width: 120,
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
  // 编辑
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    })
  }
  // 删除
  async function handleDelete(record) {
    await apiDelArea({ id: record.id })
    reload()
  }

  // 刷新表格
  function handleSuccess() {
    reload()
  }
</script>
