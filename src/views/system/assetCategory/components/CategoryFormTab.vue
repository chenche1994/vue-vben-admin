<template>
  <a-spin :spinning="loading">
    <BasicForm @register="registerForm" />
    <div class="j-box-bottom-button offset-20" style="margin-top: 30px">
      <div class="j-box-bottom-button-float">
        <a-button preIcon="ant-design:sync-outlined" @click="onReset">重置</a-button>
        <a-button type="primary" preIcon="ant-design:save-filled" @click="onSubmit">保存</a-button>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { watch, ref, onMounted } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { saveOrUpdateAssetCategory } from '../assetCategory.api'
  import { basicFormSchema } from '../assetCategory.data'

  const emit = defineEmits(['success'])
  const props = defineProps({
    data: { type: Object, default: () => ({}) },
    rootTreeData: { type: Array, default: () => [] },
  })
  const loading = ref<boolean>(false)
  // 当前是否是更新模式
  const isUpdate = ref<boolean>(true)
  // 当前的弹窗数据
  const model = ref<object>({})

  //注册表单
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: basicFormSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    labelWidth: 120,
  })

  onMounted(() => {
    // data 变化，重填表单
    watch(
      () => props.data,
      async () => {
        model.value = {
          name: props.data.name,
          code: props.data.code,
          ...getModalInfo(),
        }

        await resetFields()
        await setFieldsValue({ ...model.value })
      },
      { deep: true, immediate: true },
    )

    watch(
      () => props.rootTreeData,
      async () => {
        if (props.data.id) {
          const record = {
            ...getModalInfo(),
          }
          setFieldsValue({ ...record })
        }
      },
      { deep: true, immediate: true },
    )
  })

  // 设置表单其他类目信息
  function getModalInfo() {
    const formInfo = searchParent(props.rootTreeData, props.data.id)
    return {
      first: formInfo[0]?.name,
      second: formInfo[1]?.name,
      third: formInfo[2]?.name,
      fourth: formInfo[3]?.name,
    }
  }
  // 重置表单
  async function onReset() {
    await resetFields()
    await setFieldsValue({ ...model.value })
  }

  // 提交事件
  async function onSubmit() {
    try {
      loading.value = true
      let values = await validate()
      //提交表单
      await saveOrUpdateAssetCategory({ name: values.name, id: props.data.id }, isUpdate.value)
      //刷新列表
      emit('success')
      Object.assign(model.value, values)
    } finally {
      loading.value = false
    }
  }

  // 根据树节点返回它在整个树的路径
  /**
   *
   * @param {树结构} map
   * @param {节点值} node id
   * @param {树节点属性的转换，children：树的子节点，key：节点值对应的属性} vauleKey
   * @returns
   */
  function searchParent(map, node, vauleKey = { children: 'subList', key: 'id' }): any[] {
    let t: any[] = []
    for (let i = 0; i < map.length; i++) {
      const e = map[i]
      if (e[vauleKey.key] === node) {
        //若查询到对应的节点，则直接返回
        t.push(e)
        break
      } else if (e[vauleKey.children] && e[vauleKey.children].length !== 0) {
        //判断是否还有子节点，若有对子节点进行循环调用
        let p = searchParent(e[vauleKey.children], node, vauleKey)
        //若p的长度不为0，则说明子节点在该节点的children内，记录此节点，并终止循环
        if (p.length !== 0) {
          p.unshift(e)
          t = p
          break
        }
      }
    }
    return t
  }
</script>
