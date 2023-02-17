<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="``"
    @ok="handleSubmit"
    showFooter
    width="300px"
  >
    <div>{{ assetCode }}</div>
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

  function getQrUrl(url) {
    assetQrUrl.value = url
  }
  // 二维码打印
  function printQr() {
    printJS({
      printable: [assetQrUrl.value],
      type: 'image',
      header: assetCode,
    })
  }
  // 提交
  function handleSubmit() {
    closeModal()
  }
</script>
