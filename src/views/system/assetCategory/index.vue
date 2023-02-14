<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" type="flex" :gutter="10">
    <a-col :xl="12" :lg="24" :md="24" style="margin-bottom: 10px">
      <CategoryLeftTree ref="leftTree" @select="onTreeSelect" @root-tree-data="onRootTreeData" />
    </a-col>
    <a-col :xl="12" :lg="24" :md="24" style="margin-bottom: 10px">
      <div style="height: 100%; background-color: white">
        <a-tabs v-show="departData != null" defaultActiveKey="base-info">
          <a-tab-pane tab="基本信息" key="base-info" forceRender style="position: relative">
            <div style="padding: 20px">
              <CategoryFormTab
                :data="departData"
                :rootTreeData="rootTreeData"
                @success="onSuccess"
              />
            </div>
          </a-tab-pane>
        </a-tabs>
        <div v-show="departData == null" style="padding-top: 40px">
          <a-empty description="尚未选择资产类目" />
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="system-depart">
  import { provide, ref } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import CategoryLeftTree from './components/CategoryLeftTree.vue'
  import CategoryFormTab from './components/CategoryFormTab.vue'

  const { prefixCls } = useDesign('depart-manage')
  provide('prefixCls', prefixCls)

  // 给子组件定义一个ref变量
  const leftTree = ref()

  // 当前选中的部门信息
  const departData = ref({})
  const rootTreeData = ref<any[]>([])

  // 左侧树选择后触发
  function onTreeSelect(data) {
    console.log('onTreeSelect: ', data)
    departData.value = data
  }

  // 左侧树rootTreeData触发
  function onRootTreeData(data) {
    rootTreeData.value = data
  }

  function onSuccess() {
    leftTree.value.loadRootTreeData()
  }
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-depart-manage';

  .@{prefix-cls} {
    &--box {
      .ant-tabs-nav {
        padding: 0 20px;
      }
    }
  }
</style>
