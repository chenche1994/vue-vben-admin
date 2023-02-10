<template>
  <BasicModal v-bind="$attrs" @register="register" title="用户编辑" @ok="handleSubmit" showFooter>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup>
  import { ref, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { specialtyFormSchema } from './specialty.data'
  import { saveOrUpdateSpecialty } from '/@/api'
  // 声明Emits
  const emit = defineEmits(['success'])

  const isUpdate = ref(true)
  // 注册抽屉
  const [register, { closeModel, setModalProps }] = useModalInner(async (data) => {
    resetFields()
    setModalProps({ confirmLoading: false })
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
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: specialtyFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })
  // 提交
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true })
      let values = await validate()
      //提交表单
      await saveOrUpdateSpecialty(values, isUpdate.value)
      closeModel() // 关闭表单
      emit('success')
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
</script>
