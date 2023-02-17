<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="`查看二维码`"
    @ok="handleSubmit"
    showFooter
    width="300px"
    :bodyStyle="{ 'text-align': 'center' }"
  >
    <div>编码：{{ assetCode }}</div>
    <QrCode
      :value="qrCodeText"
      :width="200"
      :options="{ margin: 5 }"
      ref="qrDiyRef"
      @done="getQrUrl"
    />
    <a-button @click="printQr">打印</a-button>
  </BasicModal>
</template>
<script setup>
  import { ref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { QrCode } from '/@/components/Qrcode/index'
  import { printJS } from '/@/hooks/web/usePrintJS'

  const qrCodeText = ref('')
  const assetCode = ref('')
  const assetQrUrl = ref()
  // 注册model
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    const { code, name } = data.record
    assetCode.value = code
    qrCodeText.value = JSON.stringify({ name, code })
  })

  function getQrUrl({ url }) {
    assetQrUrl.value = url
  }
  // 二维码打印
  function printQr() {
    console.log(assetQrUrl.value)
    printJS({
      printable: [assetQrUrl.value],
      type: 'image',
      header: assetCode.value,
    })
  }
  // 提交
  function handleSubmit() {
    closeModal()
  }
</script>
