let pool = 0

export const uniqueId = () => {
  pool += 1
  return `Obj_${pool}`
}
