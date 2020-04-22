import Recase from '../recase'

describe('Recase', () => {
  describe('snakeCopy', () => {
    describe('when given a date', () => {
      it('returns the date', () => {
        const date = new Date()

        const result = Recase.snakeCopy(date)

        expect(result).toStrictEqual(date)
      })
    })

    describe('when given object', () => {
      it('works', () => {
        const result = Recase.snakeCopy({ camelCasedVariableName: true })

        expect(result).toStrictEqual({
          camel_cased_variable_name: true
        })
      })

      it('does not modify the existing object', () => {
        const objectToConvert = {
          camelCasedVariableName: true,
          deeplyNestedObject: {
            doesThisWork: true
          }
        }

        const result = Recase.snakeCopy(objectToConvert)

        expect(result).toStrictEqual({
          camel_cased_variable_name: true,
          deeply_nested_object: {
            does_this_work: true
          }
        })
        expect(objectToConvert).toStrictEqual({
          camelCasedVariableName: true,
          deeplyNestedObject: {
            doesThisWork: true
          }
        })
      })
    })

    describe('when given an array', () => {
      it('works', () => {
        const result = Recase.snakeCopy([{ camelCasedVariableName: false }])

        expect(result).toStrictEqual([
          {
            camel_cased_variable_name: false
          }
        ])
      })
    })
  })

  describe('camelCopy', () => {
    describe('when given a date', () => {
      it('works', () => {
        const date = new Date()

        const result = Recase.snakeCopy(date)

        expect(result).toStrictEqual(date)
      })
    })

    describe('when given an object', () => {
      it('works', () => {
        const result = Recase.camelCopy({ snake_cased_variable_name: true })

        expect(result).toStrictEqual({
          snakeCasedVariableName: true
        })
      })

      it('does not modify the existing object', () => {
        const objectToConvert = {
          camel_cased_variable_name: true,
          deeply_nested_object: {
            does_this_work: true
          }
        }

        const result = Recase.camelCopy(objectToConvert)

        expect(result).toStrictEqual({
          camelCasedVariableName: true,
          deeplyNestedObject: {
            doesThisWork: true
          }
        })
        expect(objectToConvert).toStrictEqual({
          camel_cased_variable_name: true,
          deeply_nested_object: {
            does_this_work: true
          }
        })
      })
    })

    describe('when given an array', () => {
      it('works', () => {
        const result = Recase.camelCopy([{ snake_cased_variable_name: true }])

        expect(result).toStrictEqual([
          {
            snakeCasedVariableName: true
          }
        ])
      })
    })
  })
})
