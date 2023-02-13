<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    :title="`员工${title}`"
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
  import { accountFormSchema } from '../employee.data'
  import { saveOrUpdateEmployee } from '/@/api'
  // 声明Emits
  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))
  const rowId = ref('')
  // 注册表单
  const [registerForm, { validate, setFieldsValue, resetFields, updateSchema }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })
  // 注册抽屉
  const [register, { closeDrawer, setDrawerProps }] = useDrawerInner(async (data) => {
    resetFields()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    updateSchema([
      // 隐藏是否创建账号
      {
        field: 'createAccount',
        show: !isUpdate.value,
      },
    ])
    if (unref(isUpdate)) {
      rowId.value = data.record.id
      console.log(rowId.value)
      setFieldsValue({
        // 设置回显值
        ...data.record,
      })
    }
  })

  // 提交
  async function handleSubmit() {
    try {
      setDrawerProps({ confirmLoading: true })
      let values = await validate()
      //提交表单
      await saveOrUpdateEmployee({ ...values, id: rowId.value }, isUpdate.value)
      closeDrawer() // 关闭表单
      emit('success')
    } finally {
      setDrawerProps({ confirmLoading: false })
    }
  }
</script>
