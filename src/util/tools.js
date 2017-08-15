export const getNameById = (obj, id) => {
  let newobj = ''
  Object.keys(obj).forEach((elem, index) => {
    if (obj[elem]['id'] === Number(id)) {
      newobj = obj[elem]
    }
  })
  return newobj['name']
}
