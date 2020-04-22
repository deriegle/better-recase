export default class Recase {
  /**
   * Creates a copy of the object and converts all keys in the object to snake_case
   */
  public static snakeCopy<T>(obj: T): T {
    return Recase.deepCopy(obj, this.snakify)
  }

  /**
   * Creates a copy of the object and converts all keys in the object to camelCase
   * @params obj
   */
  public static camelCopy<T>(obj: T): T {
    return Recase.deepCopy(obj, this.camelize)
  }

  /**
   * Converts string to camelCase
   * @params obj
   */
  public static camelize(key: string): string {
    // Check for CamelCaps string
    if (key[0].match(/[A-Z]/)) {
      key = `${key[0].toLowerCase()}${key.slice(1)}`
    }

    return key
      .replace(/^(_+)/, '*$1*')
      .replace(/_([a-z])/g, (_: any, c: any) => c.toUpperCase())
      .replace(/^\*(_+)\*/, '$1')
  }

  /**
   * Converts string to snake_case
   * @params obj
   */
  public static snakify(key: string): string {
    // Check for CamelCaps string
    if (key[0].match(/[A-Z]/)) {
      key = `${key[0].toLowerCase()}${key.slice(1)}`
    }

    return key.replace(/([A-Z])/g, '_$1').toLowerCase()
  }

  /** @ignore */
  private static deepCopy<T>(orig: Array<T> | T, recaseFunc: Function): any {
    if (Array.isArray(orig)) {
      return Recase.recaseArray(orig, recaseFunc)
    }

    if (Recase.isPresentObject(orig) && !Recase.isDate(orig)) {
      return Recase.recaseObject(orig, recaseFunc)
    }

    return orig
  }

  /** @ignore */
  private static recaseObject(orig: { [k: string]: any }, recaseFunc: Function) {
    return Object.entries(orig).reduce((result: { [k: string]: any }, [key, value]) => {
      const recasedKey = recaseFunc(key)
      result[recasedKey] = Recase.deepCopy(value, recaseFunc)

      return result
    }, {})
  }

  /** @ignore */
  private static recaseArray<T>(orig: Array<T>, recaseFunc: Function) {
    return orig.map((val: T) => {
      return Recase.deepCopy(val, recaseFunc)
    })
  }

  /** @ignore */
  private static isPresentObject(val: any) {
    return val !== null && typeof val === 'object'
  }

  /** @ignore */
  private static isDate(val: any) {
    return val instanceof Date
  }
}
