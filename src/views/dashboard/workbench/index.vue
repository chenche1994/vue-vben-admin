<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <div>access_token:{{ token }}</div>
    <div>refresh_token: {{ refresh_token }}</div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page'
  import WorkbenchHeader from './components/WorkbenchHeader.vue'
  import { useUserStoreWithOut } from '/@/store/modules/user'
  const userStore = useUserStoreWithOut()

  const token = userStore.getToken
  const refresh_token = userStore.getRefreshToken
</script>
