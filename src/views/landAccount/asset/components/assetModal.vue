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

    <CollapseContainer title="组成部件信息" class="mt-4"> 111 </CollapseContainer>
  </BasicModal>
</template>
<script setup>
  import { ref, unref, computed } from 'vue'
  import { CollapseContainer } from '/@/components/Container'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { basicFormSchema, priceFormSchema } from '../asset.data'
  import { saveOrUpdateAsset } from '../asset.api'

  const props = defineProps({
    rootTreeData: { type: Array, default: () => [] },
  })
  // 声明Emits
  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))

  const rowId = ref('')

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
    if (Array.isArray(props.rootTreeData)) {
      updateSchema([
        {
          field: 'categoryId',
          componentProps: { treeData: props.rootTreeData },
        },
      ])
    }
  })

  // 提交
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true })
      let values = await validate()
      // setFieldsValue({ })
      let valuesPrice = await validatePrice()
      //提交表单
      await saveOrUpdateAsset(
        { ...values, ...valuesPrice, id: rowId.value, categoryId: 1, areaId: 1 },
        isUpdate.value,
      )
      closeModal() // 关闭表单
      emit('success')
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
</script>
