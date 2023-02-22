<template>
  <BasicModal
    v-bind="$attrs"
    defaultFullscreen
    :canFullscreen="false"
    @register="registerModal"
    :title="`资产${title}`"
    @ok="handleSubmit"
    showFooter
    :bodyStyle="{ background: '#eee' }"
  >
    <CollapseContainer title="资产基础信息">
      <BasicForm @register="registerBasicInfo" />
    </CollapseContainer>

    <CollapseContainer title="价值管理信息" class="mt-4">
      <BasicForm @register="registerPriceInfo" />
    </CollapseContainer>

    <CollapseContainer title="组成部件信息" class="mt-4">
      <a-button type="primary" @click="openModal">添加组件</a-button>
      <BasicTable @register="registerTable">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
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
    </CollapseContainer>
    <AssetPartModal @register="registerPartModal" @selectPart="handleSelectPart" />
  </BasicModal>
</template>
<script setup>
  import { ref, unref, computed } from 'vue'
  import { CollapseContainer } from '/@/components/Container'
  import { BasicModal, useModalInner, useModal } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { basicFormSchema, priceFormSchema, columnsPart } from '../asset.data'
  import { saveOrUpdateAsset } from '../asset.api'
  import AssetPartModal from '../components/assetPartModal.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useUserStore } from '/@/store/modules/user'
  const userInfo = useUserStore().getUserInfo

  const { createErrorModal } = useMessage()
  const props = defineProps({
    rootTreeData: { type: Array, default: () => [] },
    orgTreeData: { type: Array, default: () => [] },
    areaTreeData: { type: Array, default: () => [] },
  })
  // 声明Emits
  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))
  const rowId = ref('')
  const parts = ref([])
  // 注册基本信息表单
  const [registerBasicInfo, { validate, setFieldsValue, resetFields, updateSchema }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 6 },
    schemas: basicFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })
  // 注册基本价格信息表单
  const [
    registerPriceInfo,
    { validate: validatePrice, setFieldsValue: setPriceField, resetFields: resetPrice },
  ] = useForm({
    labelWidth: 100,
    baseColProps: { span: 6 },
    schemas: priceFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })

  // 注册model
  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    resetFields()
    resetPrice()
    setModalProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
      setFieldsValue({
        // 设置回显值
        ...data.record,
      })
      setPriceField({ ...data.record })
      rowId.value = data.record.id
    }
    updateTreeData([
      {
        field: 'categoryId',
        treeData: props.rootTreeData,
      },
      {
        field: 'proprietorDept',
        treeData: props.orgTreeData,
      },
      {
        field: 'dispatchDept',
        treeData: props.orgTreeData,
      },
      {
        field: 'maintainDept',
        treeData: props.orgTreeData,
      },
      {
        field: 'operateDept',
        treeData: props.orgTreeData,
      },
      {
        field: 'areaId',
        treeData: props.areaTreeData,
      },
    ])
  })

  // 注册打开组件modal
  const [registerPartModal, { openModal }] = useModal(() => {})
  // 批量更新schema
  function updateTreeData(infoArr) {
    const updateInfo = infoArr
      .filter((v) => v.treeData && Array.isArray(v.treeData))
      .map((v) => ({
        field: v.field,
        componentProps: { treeData: v.treeData },
      }))
    updateSchema(updateInfo)
  }

  const [registerTable, { setTableData }] = useTable({
    columns: columnsPart,
    bordered: true,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    pagination: false,
  })

  // 选择组件
  function handleSelectPart(arr) {
    parts.value = parts.value.concat(arr)
    parts.value = Array.from(new Set(parts.value))
    setTableData(parts.value)
  }
  // 删除组件
  function handleDelete({ id }) {
    parts.value = parts.value.filter((v) => v.id !== id)
    setTableData(parts.value)
  }
  // 提交
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true })
      let values = await validate()
      // setFieldsValue({ })
      let valuesPrice = await validatePrice()
      // 组件提示
      const hasPartsNoNumber = parts.value.some((v) => !v.amount)
      if (hasPartsNoNumber) {
        return createErrorModal({ content: '请先保存组件数量' })
      }
      //提交表单
      await saveOrUpdateAsset(
        {
          ...values,
          ...valuesPrice,
          id: rowId.value,
          creator: userInfo.id,
          creatorJobNumber: 'J001',
          parts: parts.value.map((v) => ({ componentId: v.id, amount: v.amount })),
        },
        isUpdate.value,
      )
      closeModal() // 关闭表单
      emit('success')
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
</script>
