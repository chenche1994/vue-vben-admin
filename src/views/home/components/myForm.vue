<template>
  <Card>
    <div><Icon icon="ion:grid-outline" class="mr-2" />我的工单</div>
    <a-divider />
    <div class="flex statis">
      <div v-for="item in statis" :key="item.key" class="statis-item">
        <p class="number">
          {{ item.number }}
        </p>
        <p class="title">
          {{ item.label }}
        </p>
        <p class="title-hover"> 立即处理<i class="el-icon-right" style="margin-left: 2px"></i> </p>
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue'
  import { ref } from 'vue'
  import Icon from '/@/components/Icon'
  const statis = ref([
    {
      number: 10,
      label: '全部待审批',
      key: 'todo',
    },
    {
      number: 13,
      label: '已超时',
      key: 'timeout',
    },
  ])
</script>
<style lang="less">
  .statis {
    height: 85px;

    .statis-item {
      flex: 1;
      height: 100%;
      padding: 6.5px 8px;
      margin-right: 8px;
      border-radius: 8px;
      outline: none;
      cursor: pointer;
      position: relative;

      &:nth-child(2) {
        color: #d1190f;
      }

      &:nth-child(3) {
        color: #ff914d;
      }

      .number {
        margin-bottom: 8px;
        font-family: QingflowFont;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 40px;
      }

      .title {
        position: absolute;
        font-size: 14px;
        color: #767e89;
        transition: all 0.4s ease;
      }

      .title-hover {
        position: absolute;
        font-size: 14px;
        color: #767e89;
        opacity: 0;
        transition: all 0.4s ease;
        transform: translateY(30px);
      }

      &:hover {
        .title {
          transform: translateY(-30px);
          opacity: 0;
        }

        .title-hover {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
</style>
