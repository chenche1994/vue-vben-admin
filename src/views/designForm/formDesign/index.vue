<template>
  <BasicModal v-bind="$attrs" title="Modal Title" defaultFullscreen> Modal Info. </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { BasicModal } from '/@/components/Modal'
  export default defineComponent({
    components: { BasicModal },
    setup() {
      return {}
    },
  })
</script>
