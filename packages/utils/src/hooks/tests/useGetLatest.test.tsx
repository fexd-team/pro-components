import { renderHook } from '@testing-library/react-hooks'
import useGetLatest from '../useGetLatest'

describe('useGetLatest', () => {
  it('should return the latest value', () => {
    const initialValue = 0
    const { result, rerender } = renderHook((props) => useGetLatest(props), { initialProps: initialValue })
    expect(result.current()).toBe(initialValue)

    const updatedValue = 1
    rerender(updatedValue)
    expect(result.current()).toBe(updatedValue)
  })
})
