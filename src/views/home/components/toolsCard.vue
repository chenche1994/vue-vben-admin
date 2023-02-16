<template>
  <Card>
    <div><Icon icon="ion:grid-outline" class="mr-2" />常用工具</div>
    <div class="flex pt-4 justify-around">
      <a v-for="item in entrance" :key="item.title" :href="item.path"
        ><img class="img" :src="item.url" /><div class="text-center">{{ item.title }}</div></a
      >
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue'
  import Icon from '/@/components/Icon'
  import { entranceList } from '../home.data'
  import { ref } from 'vue'
  const entrance = ref(entranceList)
</script>
