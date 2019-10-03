import Recase from "../src/recase";

describe("Recase", () => {
  describe('snakeCopy', () => {
    describe('when given a date', () => {
      it('returns the date', () => {
        const date = new Date();

        const result = Recase.snakeCopy(date);

        expect(result).toStrictEqual(date);
      });
    });

    describe('when given object', () => {

      it('works', () => {
        const result = Recase.snakeCopy({ camelCasedVariableName: true });

        expect(result).toStrictEqual({
          camel_cased_variable_name: true,
        });
      });
    });

    describe('when given an array', () => {
      it('works', () => {
        const result = Recase.snakeCopy([{ camelCasedVariableName: false }]);

        expect(result).toStrictEqual([
          {
            camel_cased_variable_name: false,
          }
        ]);
      });
    });
  });

  describe('camelCopy', () => {
    describe('when given a date', () => {
      it('works', () => {

        const date = new Date();

        const result = Recase.snakeCopy(date);

        expect(result).toStrictEqual(date);
      });
    });

    describe('when given an object', () => {
      it('works', () => {
        const result = Recase.camelCopy({ snake_cased_variable_name: true });

        expect(result).toStrictEqual({
          snakeCasedVariableName: true,
        });
      });
    });

    describe('when given an array', () => {
      it('works', () => {
        const result = Recase.camelCopy([{ snake_cased_variable_name: true }]);

        expect(result).toStrictEqual([{
          snakeCasedVariableName: true,
        }]);
      });
    });
  });
})
