<template>
  <BasicDrawer
    v-bind="$attrs"
    width="500px"
    @register="registerAccountDrawer"
    :title="`字典${title}`"
    @ok="handleSubmit"
    showFooter
  >
    <BasicForm @register="registerForm">
      <template #item="row">
        <div v-for="(item, index) in itemList" :key="index" class="flex items-center">
          <a-form-item class="!mr-4 !mb-4" required>
            <a-input v-model:value="item.name" placeholder="配置项名称" />
          </a-form-item>
          <a-form-item class="!mr-4 !mb-4" required>
            <a-input v-model:value="item.code" placeholder="配置项编码" />
          </a-form-item>
          <a-button
            type="primary"
            shape="circle"
            :size="'small'"
            @click="add(row)"
            :preIcon="'ant-design:plus-outlined'"
            class="mx-2 mb-4"
          />
          <a-button
            type="primary"
            shape="circle"
            :size="'small'"
            @click="del(index)"
            :preIcon="'ant-design:minus-outlined'"
            class="mb-4"
          />
        </div>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script setup>
  import { ref, unref, computed, reactive } from 'vue'
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { dictFormSchema } from './dict.data'
  import { saveOrUpdateDict } from '/@/api'
  // 声明Emits
  const emit = defineEmits(['success', 'register'])

  const itemList = reactive([{ name: '', code: '' }])
  const isUpdate = ref(true)
  const title = computed(() => (isUpdate.value ? '编辑' : '新增'))
  const rowId = ref('')
  // 注册抽屉
  const [registerAccountDrawer, { closeDrawer, setDrawerProps }] = useDrawerInner(async (data) => {
    resetFields()
    setDrawerProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
      setFieldsValue({
        // 设置回显值
        ...data.record,
      })
      rowId.value = data.record.id
    }
  })

  // 注册表单
  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: dictFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })
  // 提交
  async function handleSubmit() {
    try {
      setDrawerProps({ confirmLoading: true })
      setFieldsValue({
        itemList: itemList,
      })
      let values = await validate()
      //提交表单
      await saveOrUpdateDict({ ...values, id: rowId.value }, isUpdate.value)
      closeDrawer() // 关闭表单
      emit('success')
    } finally {
      setDrawerProps({ confirmLoading: false })
    }
  }

  function del(field) {
    console.log(field)
  }
  function add() {
    itemList.push({ name: '', code: '' })
  }
</script>
