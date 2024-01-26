import filterObjectEmptyValue from '../filterObjectEmptyValue'

describe('filterObjectEmptyValue', () => {
  it('should filter out null, undefined, and empty string values', () => {
    const obj = {
      name: 'John',
      age: 28,
      email: '',
      address: null,
      city: undefined,
      country: 'USA',
    }

    const expectedResult = {
      name: 'John',
      age: 28,
      country: 'USA',
    }

    expect(filterObjectEmptyValue(obj)).toEqual(expectedResult)
  })

  it('should return an empty object if all properties are empty values', () => {
    const obj = {
      name: '',
      age: null,
      email: undefined,
    }

    const expectedResult = {}

    expect(filterObjectEmptyValue(obj)).toEqual(expectedResult)
  })

  it('should return the same object if there are no empty values', () => {
    const obj = {
      name: 'Jane',
      age: 32,
      country: 'Canada',
    }

    const expectedResult = {
      name: 'Jane',
      age: 32,
      country: 'Canada',
    }

    expect(filterObjectEmptyValue(obj)).toEqual(expectedResult)
  })

  it('should return an empty object if the input object is empty', () => {
    const obj = {}

    const expectedResult = {}

    expect(filterObjectEmptyValue(obj)).toEqual(expectedResult)
  })
})
