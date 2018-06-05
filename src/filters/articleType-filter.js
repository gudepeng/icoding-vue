let at = [
  {
    value: '1', label: '前端'
  },
  {
    value: '2', label: '后端'
  },
  {
    value: '3', label: '手机端'
  },
  {
    value: '4', label: '人工智能'
  },
  {
    value: '5', label: '技术简介'
  }
]

export const artileValueToLable = (value) => {
  let a=""
   at.forEach((e) => {
    if (e.value == value) {
      a = e.label
    }
  })
  return a
}
