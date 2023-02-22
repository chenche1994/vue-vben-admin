<template>
  <PageWrapper>
    <div style="background-color: #fff; height: 100%" :class="`${prefixCls}--box`">
      <a-tabs>
        <a-tab-pane v-for="tab in eventTabsList" :key="tab.key" :tab="tab.title">
          <EventList :formType="tab.key" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { provide, ref } from 'vue'
  import { PageWrapper } from '/@/components/Page'
  import EventList from '/@/views/dashboard/components/EventList.vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { eventTabs } from '/@/views/dashboard/index.data'
  const { prefixCls } = useDesign('formList')
  provide('prefixCls', prefixCls)

  const eventTabsList = ref(eventTabs)
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-formList';

  .@{prefix-cls} {
    &--box {
      .ant-tabs-nav {
        padding: 0 20px;
      }
    }
  }
</style>
