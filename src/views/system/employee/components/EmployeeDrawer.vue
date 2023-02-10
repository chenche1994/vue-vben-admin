<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="员工编辑" @ok="handleSubmit" showFooter>
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script setup>
  import { ref, unref } from 'vue'
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { accountFormSchema } from '../employee.data'
  import { saveOrUpdateEmployee } from '/@/api'
  // 声明Emits
  const emit = defineEmits(['success'])

  const isUpdate = ref(true)
  // 注册抽屉
  const [register, { closeDrawer, setDrawerProps }] = useDrawerInner(async (data) => {
    resetFields()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
      setFieldsValue({
        // 设置回显值
        ...data.record,
      })
    }
  })

  // 注册表单
  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 120,
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
      await saveOrUpdateEmployee(values, isUpdate.value)
      closeDrawer() // 关闭表单
      emit('success')
    } finally {
      setDrawerProps({ confirmLoading: false })
    }
  }
</script>
