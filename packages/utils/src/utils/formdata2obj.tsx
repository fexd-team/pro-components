export default function formdata2obj(formData: FormData) {
  const obj: any = {}

  formData.forEach((value, key) => {
    obj[key] = value
  })

  return obj
}
