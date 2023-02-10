<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerAccountDrawer"
    :title="`用户${title}`"
    @ok="handleSubmit"
    showFooter
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script setup>
  import { ref, unref, computed } from 'vue'
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { accountFormSchema } from '../account.data'
  import { saveOrUpdateUser } from '/@/api'
  // 声明Emits
  const emit = defineEmits(['success'])

  const isUpdate = ref(true)
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))
  const rowId = ref('')
  // 注册抽屉
  const [registerAccountDrawer, { closeDrawer, setDrawerProps }] = useDrawerInner(async (data) => {
    resetFields()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
      setFieldsValue({
        // 设置回显值
        ...data.record,
      })
      rowId.value = data.record.id
    }
  })

  // 注册表单
  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })
  // 提交
  async function handleSubmit() {
    try {
      setDrawerProps({ confirmLoading: true })
      let values = await validate()
      //提交表单
      await saveOrUpdateUser({ ...values, id: rowId.value }, isUpdate.value)
      closeDrawer() // 关闭表单
      emit('success')
    } finally {
      setDrawerProps({ confirmLoading: false })
    }
  }
</script>
