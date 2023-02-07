<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="用户编辑" @ok="handleSubmit" showFooter>
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script setup>
  import { BasicDrawer, useDrawer } from '/@/components/Drawer'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { accountFormSchema } from '../account.data'
  // 声明Emits
  const emit = defineEmits(['success'])
  // 注册抽屉
  const [register, { closeDrawer }] = useDrawer()
  // 注册表单
  const [registerForm] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })
  // 提交
  function handleSubmit() {
    closeDrawer() // 关闭表单
    emit('success')
  }
</script>
