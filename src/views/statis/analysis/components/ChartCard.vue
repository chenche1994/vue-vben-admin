<template>
  <Card :title="title" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue'
  import { Card } from 'ant-design-vue'
  import { useECharts } from '/@/hooks/web/useECharts'
  import { basicProps } from './props'
  const props = defineProps({
    ...basicProps,
  })
  const chartRef = ref<HTMLDivElement | null>(null)
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

  watch(
    () => props.option,
    () => {
      if (!props.option) {
        return
      }
      setOptions(props.option)
    },
    { immediate: true },
  )
</script>
