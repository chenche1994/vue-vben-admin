<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="资产类目"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'name' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'

  import { BasicTree, TreeItem } from '/@/components/Tree'
  import { apiGetAssetCategoryTree } from '/@/views/system/assetCategory/assetCategory.api'

  export default defineComponent({
    name: 'AssetCategoryTree',
    components: { BasicTree },

    emits: ['select', 'rootTreeData'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([])

      async function fetch() {
        const data = (await apiGetAssetCategoryTree({})) as unknown as TreeItem[]
        if (Array.isArray(data)) {
          treeData.value = data
        } else {
          treeData.value = [data]
        }
        emit('rootTreeData', treeData.value)
      }

      function handleSelect(keys) {
        emit('select', keys[0])
      }

      onMounted(() => {
        fetch()
      })
      return { treeData, handleSelect }
    },
  })
</script>
