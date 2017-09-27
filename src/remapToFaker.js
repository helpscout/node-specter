import FakerMethods from './constants/FakerMethods'

const stripVariableToken = (variable) => {
  return variable.replace(/@/g, '')
}

const remapToFaker = (specs) => {
  const newSpecs = Object.assign({}, specs)

  Object.keys(specs).map(key => {
    const value = specs[key]
    if (typeof value === 'object') {
      newSpecs[key] = remapToFaker(value)
    } else {
      const method = stripVariableToken(value)
      newSpecs[key] = value.indexOf('@') === 0 ? FakerMethods[method]() : value
    }
  })

  return newSpecs
}

export default remapToFaker
