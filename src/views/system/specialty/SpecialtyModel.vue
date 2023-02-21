<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModel"
    :title="`专业${title}`"
    @ok="handleSubmit"
    showFooter
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup>
  import { ref, unref, computed } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { specialtyFormSchema } from './specialty.data'
  import { saveOrUpdateSpecialty } from '/@/api'
  // 声明Emits
  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))
  const rowId = ref('')
  // 注册抽屉
  const [registerModel, { closeModal, setModalProps }] = useModalInner(async (data) => {
    resetFields()
    setModalProps({ confirmLoading: false })
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
      await saveOrUpdateSpecialty({ ...values, id: rowId.value }, isUpdate.value)
      closeModal() // 关闭表单
      emit('success')
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
</script>
