export default class RegExpService {
  static splitStringAsFloat(separator, src) {
    try {
      const regExp = new RegExp(`[\n\r(\n\r)${separator}]`, 'g')
      const match = src.split(regExp)
      if (!match) {
        return []
      }
      const values = match.reduce((acc, val) => {
        if (val == '') {
          return acc
        } else {
          const floatVal = parseFloat(val)
          if(Number.isNaN(floatVal)) {
            return acc
          } else {
            return acc.concat(floatVal)
          }
        }
      }, [])
      return values
    } catch (err) {
      console.err(error)
      return []
    }
  }
}