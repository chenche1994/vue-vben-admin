<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'name' }"
      @select="handleSelect"
      @reset="handleSelect([])"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'

  import { BasicTree, TreeItem } from '/@/components/Tree'
  import { apiGetOrgTree } from '/@/api/sys/org'

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([])

      async function fetch() {
        const data = (await apiGetOrgTree()) as unknown as TreeItem[]
        if (Array.isArray(data)) {
          treeData.value = data
        } else {
          treeData.value = [data]
        }
        console.log(treeData.value)
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
