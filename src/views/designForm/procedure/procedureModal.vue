<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="`流程${title}`"
    @ok="handleSubmit"
    showFooter
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup>
  import { ref, unref, computed, reactive } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { basicFormSchema } from './procedure.data'
  import { apiDeployProcedure } from './procedure.api'
  // 声明Emits
  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))

  const rowId = ref('')

  // 注册model
  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
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
    schemas: basicFormSchema(beforeUpload),
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })
  const formData = reactive(new FormData())
  function beforeUpload(file) {
    formData.append('xmlFile', file)
    return false //中断上传
  }
  // 提交
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true })

      let values = await validate()

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })
      //提交表单
      await apiDeployProcedure(formData, isUpdate.value)
      closeModal() // 关闭表单
      emit('success')
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
</script>
