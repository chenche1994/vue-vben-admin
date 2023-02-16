<template>
  <BasicModal
    v-bind="$attrs"
    title="设计表单"
    defaultFullscreen
    :canFullscreen="false"
    @ok="handleSubmit"
    @register="registerModal"
  >
    <FcDesigner ref="designer" />
  </BasicModal>
</template>
<script setup>
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import FcDesigner from '@form-create/designer'
  import { ref } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createErrorModal } = useMessage()
  const designer = ref()
  // 声明Emits
  const emit = defineEmits(['success'])

  //注册表单（在这里赋值
  const [registerModal, { closeModal }] = useModalInner()

  // 提交
  function handleSubmit() {
    const rule = designer.value.getRule()
    const option = designer.value.getOption()
    const { form } = option
    if (!form?.name) {
      return createErrorModal({ content: '请输入表单name' })
    }
    if (!form?.formKey) {
      return createErrorModal({ content: '请输入表单的formKey' })
    }
    closeModal() // 关闭表单
    const config = {
      name: form.name,
      key: form.formKey,
      formConfig: rule,
      formOption: form,
    }
    emit('success', config)
  }
</script>
