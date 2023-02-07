<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <div>{{ code }}</div>
    <div>access_token:</div>
    <div>refresh_token:</div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page'
  import WorkbenchHeader from './components/WorkbenchHeader.vue'
  const href = location.href
  let startIndex = href.indexOf('?')
  let endIndex = href.indexOf('#')
  const code = href.substring(startIndex + 1, endIndex)

  window.open(
    `http://172.19.3.47:8080/oauth/token?grant_type=authorization_code&client_id=tpm&client_secret=abcd1234&redirect_uri=https://172.16.130.135:3100&${code}`,
    '_blank',
  )
</script>
