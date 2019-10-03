export default class Recase {
  public static snakeCopy<T>(obj: T): T {
    return Recase.deepCopy(obj, this.snakify);
  }

  public static camelCopy<T>(obj: T): T {
    return Recase.deepCopy(obj, this.camelize);
  }

  public static camelize(key: string): string {
    return key
    .replace(/^(_+)/, '*$1*')
    .replace(/_([a-z])/g, (_: any, c: any) => c.toUpperCase())
    .replace(/^\*(_+)\*/, '$1');
  }

  public static snakify(key: string): string {
    return (key.replace(/([A-Z])/g, '_$1').toLowerCase());
  }

  private static deepCopy<T>(orig: Array<T> | T, recaseFunc: Function): any {
    if (Array.isArray(orig)) {
      return Recase.recaseArray(orig, recaseFunc);
    }

    if (Recase.isPresentObject(orig) && !Recase.isDate(orig)) {
      return Recase.recaseObject(orig, recaseFunc);
    }

    return orig;
  }

  private static recaseObject(orig: { [k: string]: any }, recaseFunc: Function) {
    return Object.entries(orig).reduce((result: { [k: string]: any }, [key, value]) => {
      const recasedKey = recaseFunc(key);
      result[recasedKey] = Recase.deepCopy(value, recaseFunc);

      return result;
    }, {});
  }

  private static recaseArray<T>(orig: Array<T>, recaseFunc: Function) {
    return orig.map((val: T) => {
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
