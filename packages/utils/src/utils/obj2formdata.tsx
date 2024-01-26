export default function obj2formdata(obj: any) {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]: any) => {
    formData.append(key, value)
  })

  return formData
}
