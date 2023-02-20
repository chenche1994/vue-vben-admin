<template>
  <BasicModal
    v-bind="$attrs"
    width="80%"
    @register="registerModal"
    :title="`组件选择`"
    @ok="handleSubmit"
    showFooter
    :bodyStyle="{ background: '#eee' }"
  >
    <div class="flex">
      <AssetCategoryTree class="w-1/4 xl:w-1/5" />
      <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" />
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import AssetCategoryTree from './assetCategoryTree.vue'
  import { BasicTable, useTable } from '/@/components/Table'
  import { apiGetComponentList } from '/@/views/system/part/part.api'
  import { columns } from '/@/views/system/part/part.data'
  // 声明Emits
  const emit = defineEmits(['selectPart'])
  // 注册model
  const [registerModal, { closeModal }] = useModalInner()
  // 注册表格
  const [registerTable, { getSelectRows }] = useTable({
    api: apiGetComponentList,
    columns,
    bordered: true,
    formConfig: {
      labelWidth: 80,
      schemas: [
        {
          field: 'nameLike',
          label: '组件名称',
          component: 'Input',
          colProps: { span: 6 },
        },
        {
          field: 'userNickLike',
          label: '组件编码',
          component: 'Input',
          colProps: { span: 6 },
        },
      ],
      autoSubmitOnEnter: true,
      baseColProps: {
        span: 6,
      },
    },
    useSearchForm: true,
    rowSelection: {},
  })

  function handleSubmit() {
    const selectRows = getSelectRows()
    emit('selectPart', selectRows)
    closeModal()
  }
</script>
