import { useMessage } from '/@/hooks/web/useMessage'
const { createConfirm } = useMessage()

export function useApiDelete(func: Promise<any>, confirm = false) {
  return new Promise((resolve, reject) => {
    const doDelete = () => {
      resolve(func)
    }
    if (confirm) {
      createConfirm({
        iconType: 'warning',
        title: '删除',
        content: '确定要删除吗？',
        onOk: () => doDelete(),
        onCancel: () => reject(),
      })
    } else {
      doDelete()
    }
  })
}
