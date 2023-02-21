<template>
  <div class="p-4">
    <a-form layout="inline">
      <a-form-item>
        <a-radio-group v-model:value="formData.dateType" :options="plainOptions" />
      </a-form-item>
      <a-form-item label="时间">
        <a-range-picker v-model:value="formData.date" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 查询 </a-button>
      </a-form-item>
    </a-form>
    <div class="md:flex enter-y my-4">
      <ChartCard class="md:w-1/3 w-full" v-bind="doneStatisProps" />
      <ChartCard class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" v-bind="delayStatisProps" />
      <ChartCard class="md:w-1/3 w-full" v-bind="rateStatisProps" />
    </div>
    <div class="md:flex enter-y">
      <ChartCard class="md:w-1/3 w-full" v-bind="gradeStatisProps" />
      <ChartCard class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" v-bind="specialtyStatisProps" />
      <TableStatis class="md:w-1/3 w-full" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import ChartCard from './components/ChartCard.vue'
  import TableStatis from './components/TableStatis.vue'
  import {
    doneStatisOption,
    delayStatisOption,
    rateStatisOption,
    gradeStatisOption,
    specialtyStatisOption,
  } from './data'
  const formData = reactive({
    date: [],
    dateType: '月',
  })
  const plainOptions = ref(['天', '月', '年'])
  const doneStatisProps = reactive(doneStatisOption)
  const delayStatisProps = reactive(delayStatisOption)
  const rateStatisProps = reactive(rateStatisOption)
  const gradeStatisProps = reactive(gradeStatisOption)
  const specialtyStatisProps = reactive(specialtyStatisOption)
</script>
