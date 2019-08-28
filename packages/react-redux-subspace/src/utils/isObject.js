const isObject = value => {
  const type = typeof value
  return type == "object" && value != null && !Array.isArray(value)
}

export default isObject
