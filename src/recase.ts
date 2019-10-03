type Exceptions = Array<string>; 

export default class Recase {
  public static snakeCopy(obj: any, exceptions: Exceptions = []): any {
    const recaseFunction = (key: any) => exceptions.includes(key) ? key : this.snakify(key);

    return Recase.deepCopy(obj, recaseFunction);
  }

  public static camelCopy(obj: any, exceptions: Exceptions = []): any {
    const recaseFunction = (key: any) => exceptions.includes(key) ? key : this.camelize(key);

    return Recase.deepCopy(obj, recaseFunction);
  }

  public static camelize(key: any): any {
    return key
    .replace(/^(_+)/, '*$1*')
    .replace(/_([a-z])/g, (_: any, c: any) => c.toUpperCase())
    .replace(/^\*(_+)\*/, '$1');
  }

  public static snakify(key: any): any {
    return (key.replace(/([A-Z])/g, '_$1').toLowerCase());
  }

  private static deepCopy(orig: any, recaseFunc: Function) {
    switch (true) {
      case Array.isArray(orig):
        return Recase.recaseArray(orig, recaseFunc);
      case Recase.isPresentObject(orig) && !Recase.isDate(orig):
        return Recase.recaseObject(orig, recaseFunc);
      default:
        return orig;
    }
  }

  private static recaseObject(orig: any, recaseFunc: Function) {
    return Object.entries(orig).reduce((result: any, [key, value]) => {
      const recasedKey = recaseFunc(key);
      result[recasedKey] = Recase.deepCopy(value, recaseFunc);

      return result;
    }, {});
  }

  private static recaseArray(orig: any, recaseFunc: Function) {
    return orig.map((val: any) => {
      return Recase.deepCopy(val, recaseFunc);
    });
  }

  private static isPresentObject(val: any) {
    return val !== null && typeof val === 'object';
  }

  private static isDate(val: any) {
    return val instanceof Date;
  }
}
