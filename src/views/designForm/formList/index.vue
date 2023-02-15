<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="openDesignModal()"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="getTableAction(record)"
            :dropDownActions="getDropDownAction(record)"
          />
        </template>
      </template>
    </BasicTable>
    <DesignModel @register="registerDesignModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table'
  import { getBasicColumns } from './formlist.data'
  import { demoListApi } from '/@/api/demo/table'
  import { useModal } from '/@/components/Modal'
  import DesignModel from '../components/designModel.vue'
  import { apiCreateForm } from './formlist.api'
  // 注册表格
  const [registerTable] = useTable({
    title: '',
    api: demoListApi,
    columns: getBasicColumns(),
    bordered: true,
    actionColumn: {
      width: 250,
      title: '操作',
      dataIndex: 'action',
    },
  })
  // 注册表单设计器弹窗
  const [registerDesignModal, { openModal: openDesignModal }] = useModal()

  /**
   * 操作栏
   */
  function getTableAction(record): ActionItem[] {
    return [
      {
        label: '设计',
        onClick: openDesignModal.bind(null, record),
      },
      {
        label: '预览',
        // onClick: registerDesignModal.bind(null, record),
      },
    ]
  }

  function getDropDownAction(record): ActionItem[] {
    return [
      {
        label: '分配处理人/组',
        onClick: registerDesignModal.bind(null, record),
      },
      {
        label: '分配流程节点',
        onClick: registerDesignModal.bind(null, record),
      },
    ]
  }

  function handleSuccess(option) {
    apiCreateForm(option)
  }
</script>
