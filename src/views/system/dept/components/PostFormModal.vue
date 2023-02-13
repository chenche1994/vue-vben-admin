<template>
  <BasicModal :title="title" :width="800" v-bind="$attrs" @ok="handleOk" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { computed, ref, unref } from 'vue'

  import { BasicForm, useForm } from '/@/components/Form/index'
  import { BasicModal, useModalInner } from '/@/components/Modal'

  import { saveOrUpdatePost } from '/@/api/sys/post'
  import { postFormSchema } from '../dept.data'

  const emit = defineEmits(['success', 'register'])
  const props = defineProps({
    rootTreeData: { type: Array, default: () => [] },
  })
  // 当前是否是更新模式
  const isUpdate = ref<boolean>(false)
  // 当前的弹窗数据
  const model = ref<object>({})
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))

  //注册表单
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    schemas: postFormSchema,
    baseColProps: { span: 24 },
    showActionButtonGroup: false,
    labelWidth: 120,
  })

  // 注册弹窗
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields()
    isUpdate.value = unref(data?.isUpdate)
    // 隐藏不需要展示的字段
    updateSchema([
      {
        field: 'parentId',
        componentProps: {
          // 如果是添加子部门，就禁用该字段
          treeData: props.rootTreeData,
        },
      },
    ])

    let record = unref(data?.record)
    if (typeof record !== 'object') {
      record = {}
    }
    model.value = record
    await setFieldsValue({ ...record })
  })

  // 提交事件
  async function handleOk() {
    try {
      setModalProps({ confirmLoading: true })
      let values = await validate()
      //提交表单
      await saveOrUpdatePost(values, isUpdate.value)
      //关闭弹窗
      closeModal()
      //刷新列表
      emit('success')
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
</script>
