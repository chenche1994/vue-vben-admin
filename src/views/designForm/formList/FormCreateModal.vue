<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      :title="`表单${title}`"
      @ok="handleSubmit"
      showFooter
    >
      <BasicForm @register="registerForm">
        <template #content>
          <a-button type="primary" @click="openDesignModal">设计</a-button>
        </template>
      </BasicForm>
    </BasicModal>
    <DesignModel @register="registerDesignModal" @success="handleSuccess" />
  </div>
</template>
<script setup>
  import { ref, unref, computed } from 'vue'
  import { BasicModal, useModalInner, useModal } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { basicFormSchema } from './formlist.data'
  import { apiCreateForm } from './formlist.api'
  import DesignModel from '../components/designModel.vue'
  // 声明Emits
  const emit = defineEmits(['success', 'register'])

  const isUpdate = ref(true)
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))

  const rowId = ref('')

  // 注册model
  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    resetFields()
    setModalProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
      setFieldsValue({
        // 设置回显值
        ...data.record,
      })
      rowId.value = data.record.id
    }
  })

  // 注册表单设计器弹窗
  const [registerDesignModal, { openModal: openDesignModal }] = useModal()
  // 注册表单
  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: basicFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })
  // 提交
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true })

      let values = await validate()
      //提交表单
      await apiCreateForm(values)
      closeModal() // 关闭表单
      emit('success')
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }

  // 设计完获得配置值
  function handleSuccess(config) {
    setFieldsValue({ content: JSON.stringify(config) })
  }
</script>
