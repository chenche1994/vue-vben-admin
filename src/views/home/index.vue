<template>
  <PageWrapper>
    <div class="flex mb-4">
      <MyForm class="!mr-4 flex-1" />
      <ToolsCard class="flex-1" />
    </div>
    <MyReport />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page'
  import MyForm from './components/myForm.vue'
  import ToolsCard from './components/toolsCard.vue'
  import MyReport from './components/myReport.vue'
</script>
