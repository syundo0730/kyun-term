class IntegerValue {
  constructor(range, containerType) {
    this.Range = {
      min: range.min ? range.min : 0,
      max: range.max ? range.max : 255
    },
    this.convertToUint8Array = (value) => {
      const original = new containerType([value])
      return new Buffer(new Uint8Array(original.buffer))
    }
  }
}

export class String extends IntegerValue {
  constructor() {
    super({ min: -1000, max: 1000 }, Uint8Array)
    this.convertToUint8Array = (value) => {
      return new Buffer(value.toString())
    }
  }
}

export class Uint8 extends IntegerValue {
  constructor() {
    super({ min: 0, max: 255 }, Uint8Array)
  }
}
export class Int8 extends IntegerValue {
  constructor() {
    super({ min: -128, max: 127 }, Int8Array)
  }
}
export class Uint16 extends IntegerValue {
  constructor() {
    super({ min: 0, max: 65535 }, Uint16Array)
  }
}
export class Int16 extends IntegerValue {
  constructor() {
    super({ min: -32768, max: 32767 }, Int16Array)
  }
}
export class Uint32 extends IntegerValue {
  constructor() {
    super({ min: 0, max: 4294967295 }, Uint32Array)
  }
}
export class Int32 extends IntegerValue {
  constructor() {
    super({ min: -2147483648, max: 2147483647 }, Int32Array)
  }
}