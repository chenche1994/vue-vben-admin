<template>
  <BasicModal v-bind="$attrs" title="设计表单" defaultFullscreen :canFullscreen="false">
    <fc-designer />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal } from '/@/components/Modal'
  import FcDesigner from '@form-create/designer'
</script>
