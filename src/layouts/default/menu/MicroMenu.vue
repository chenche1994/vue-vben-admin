<template>
  <Menu
    :selectedKeys="selectedKeys"
    :mode="'horizontal'"
    :class="getMenuClass"
    @click="handleMenuClick"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" />
    </template>
    <!-- <a-menu-item  v-for="item in items" :key="item.path">{{ item.name }}</a-menu-item> -->
  </Menu>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { Menu } from 'ant-design-vue'
  import BasicSubMenuItem from '/@/components/Menu/src/components/BasicSubMenuItem.vue'
  // import { isFunction } from '/@/utils/is'
  import { useDesign } from '/@/hooks/web/useDesign'
  // import MenuItem from '/@/components/SimpleMenu/src/components/MenuItem.vue'
  import { usePermission } from '/@/hooks/web/usePermission'
  import type { Menu as MenuType } from '/@/router/types'
  import type { PropType } from 'vue'
  import { useAppStore } from '/@/store/modules/app'
  const appStore = useAppStore()
  export default defineComponent({
    name: 'BasicMenu',
    components: {
      Menu,
      BasicSubMenuItem,
    },
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => [],
      },
    },
    emits: ['menuClick'],
    setup() {
      const selectedKeys = ref([appStore.getMicro])

      const { prefixCls } = useDesign('basic-menu')

      const getMenuClass = computed(() => {
        const align = 'start'
        return [prefixCls, `justify-${align}`, `${prefixCls}__sidebar-hor`]
      })

      async function handleMenuClick(key) {
        // menuState.selectedKeys = [key]
        selectedKeys.value = [key.key]
        const { toggleMicro } = usePermission()
        toggleMicro(key.key)
      }

      return {
        handleMenuClick,
        getMenuClass,
        selectedKeys,
      }
    },
  })
</script>
<style lang="less">
  @import '/@/components/Menu/src/index.less';
</style>
