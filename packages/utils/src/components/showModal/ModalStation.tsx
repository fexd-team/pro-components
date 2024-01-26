import React, { forwardRef, Fragment } from 'react'
import { render } from 'react-dom'
import { run, isFunction } from '@fexd/tools'

export const stationMap: Record<string, any> = {}

const ModalStation = forwardRef(function ModalStation({ id }: { id: string }, ref) {
  const [modalMap, setModalMap] = React.useState({})

  React.useEffect(() => {
    stationMap[id] = {
      add: (id: string, render: Function) =>
        setModalMap((map) => ({
          ...map,
          [id]: render,
        })),
      remove: (id: string) =>
        setModalMap((map) => ({
          ...map,
          [id]: undefined,
        })),
    }

    return () => {
      delete stationMap[id]
    }
  }, [id])

  return (
    <>
      {Object.entries(modalMap)
        .filter(([, render]) => isFunction(render))
        .map(([key, render]) => (
          <Fragment key={key}>{run(render)}</Fragment>
        ))}
    </>
  )
})

export default ModalStation

const portalContainer = document.createElement('div')
document.body.appendChild(portalContainer)

render(<ModalStation id="DEFAULT_STATION" />, portalContainer)
