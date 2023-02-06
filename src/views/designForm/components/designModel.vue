<template>
  <BasicModal
    v-bind="$attrs"
    title="设计表单"
    defaultFullscreen
    :canFullscreen="false"
    @ok="handleSubmit"
    @register="registerModal"
  >
    <fc-designer ref="designer" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import FcDesigner from '@form-create/designer'
  import { ref } from 'vue'
  const designer = ref()
  // 声明Emits
  const emit = defineEmits(['success'])

  //注册表单（在这里赋值
  const [registerModal, { closeModal }] = useModalInner()

  // 提交
  function handleSubmit() {
    const rule = designer.value.getRule()
    const option = designer.value.getOption()
    console.log(rule, option)
    closeModal() // 关闭表单
    emit('success', { rule, option })
  }
</script>
