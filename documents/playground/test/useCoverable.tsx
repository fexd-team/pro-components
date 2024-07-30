import React from 'react'
import { useCoverable } from '@fexd/pro-utils/src/hooks/_useCoverable'

const CoverableComponent = useCoverable.component((props: { normalProp: number }, ref: any) => {
  const config1 = useCoverable({
    a: {
      b: {
        c: {
          d: 1,
          e: 2,
        },
        f: 3,
      },
    },
    g: [{ h: 1 }, { i: 2 }, 3],
    // custom rewrite process
    test: useCoverable.value({
      // default value
      default: {
        a: 1,
        b: 2,
      },
      // configuration item, only used to extract types
      config: {
        c: 3,
        d: 2,
      },
      // the process of merging configuration items and default values
      onCovered: (current, config) => {
        return {
          ...config,
          ...current,
        }
      },
    }),
  })

  const config2 = useCoverable({
    bar: 'bar',
    foo: 'foo',
  })

  console.log('render')
  //
  // console.log(config2?.getConfig().foo)

  return useCoverable
    .props({
      config1,
      config2,
    })
    .render(() => (
      <div style={{ whiteSpace: 'break-spaces' }}>
        <h3>props</h3>
        <div>{JSON.stringify(props, null, 2)}</div>

        <h3>config1</h3>
        <div>{JSON.stringify(config1?.getConfig(), null, 2)}</div>

        <h3>config2</h3>
        <div>{JSON.stringify(config2?.getConfig(), null, 2)}</div>
      </div>
    ))
})

function Demo() {
  const [random, setRandom] = React.useState<undefined | number>(Math.random)

  return (
    <>
      <button onClick={() => setRandom(Math.random)}>cover some props</button>
      <CoverableComponent
        normalProp={random ?? 0}
        coverable={{
          config1: {
            // c: 1,
            a: {
              b: {
                c: {
                  d: random,
                },
                f: 66,
              },
            },
            // g: {
            //   0: {}
            // },
            g: {
              0: 1,
              // asdfasdf: 2
            },
            test: {
              c: 2,
            },
          },
          config2: {
            foo: String(random),
          },
        }}
        // modify the configuration through the coverable prop
        // coverable={(rawConfig) => {
        //   console.log('rawConfig', rawConfig)

        //   // rawConfig.config1.test.a = 100

        //   return !random
        //     ? {}
        //     : {
        //         config1: {
        //           c: 1,
        //           a: {
        //             b: {
        //               c: {
        //                 d: random,
        //               },
        //               f: 66,
        //             },
        //           },
        //           test: {
        //             c: 2,
        //           },
        //         },
        //         config2: {
        //           foo: String(random),
        //         },
        //       }
        // }}
      />
    </>
  )
}

export default Demo

// /* eslint-disable @typescript-eslint/array-type */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'
// import { useCoverable } from '@fexd/pro-utils'
// import { DeepPartial, Optional, DeepRequired } from 'utility-types'
// import { useRequest } from 'ahooks'
// import {
//   DefinedApi,
//   request,
//   ServerResponse,
//   ServerRequest,
//   deepMerge,
//   deepMapItem,
//   DeepPartialObject,
// } from '@fexd/pro-utils'

// import { DeepConfigurableOptional as LegacyDeepConfigurableOptional } from '@fexd/pro-components'

// interface Props {
//   normalProp: number
//   // configurable?: string
// }

// type DefinedApiConfig<T extends DefinedApi> =
//   | ((
//       ...params: T extends { handleParams: (...args: any) => any } ? Parameters<T['handleParams']> : any[]
//     ) => T extends { handleResponse: (...args: any) => any }
//       ?
//           | (void | DeepPartialObject<ReturnType<T['handleResponse']>>)
//           | Promise<void | DeepPartialObject<ReturnType<T['handleResponse']>>>
//       : (void | Optional<ServerResponse<any>>) | Promise<void | Optional<ServerResponse<any>>>)
//   | DeepPartialObject<T>

// const Demo = useCoverable.component((props: Props, ref: any) => {
//   const addApi = request.define({
//     url: '/api/test',
//     handleParams(params: { test: number }) {
//       return {}
//     },
//     handleResponse: () => {
//       return {} as { test: number }
//     },
//   })

//   const config1 = useCoverable({
//     a: 1,
//     b: 2,
//     test: useCoverable.value({
//       default: {
//         a: 1,
//         b: 2,
//       },
//       config: {
//         c: 3,
//         d: 2,
//       },
//       onCovered: (current, config) => {
//         return {
//           ...current,
//           ...config,
//         }
//       },
//     }),
//     apis: {
//       add: useCoverable.value({
//         default: addApi,
//         config: {} as DefinedApiConfig<typeof addApi>,
//         onCovered: (current, next) => {
//           // console.log('addApi onCovered', current, next)
//           return current.override(next as any)
//         },
//       }),
//     },
//   })

//   React.useEffect(() => {
//     config1?.getConfig().apis.add({
//       test: 1,
//     })
//   }, [])

//   const config2 = useCoverable({
//     key: 1,
//     value: 2,
//   })

//   const config3 = useCoverable({
//     bar: 'bar',
//     foo: 'foo',
//   })

//   console.log('render')

//   // console.log(config1.apis.add)

//   // console.log(config1.__T__.apis.add)
//   // console.log(config1.__T__.test)

//   return useCoverable
//     .props({
//       // config1,
//       ...config1,
//       // config1,
//       // test: {
//       //   config1,
//       // },
//       config2,
//       config3,
//     })
//     .render(() => (
//       <>
//         <div>{JSON.stringify(props)}</div>
//         <div>{JSON.stringify(config1?.getConfig())}</div>
//         <div>{JSON.stringify(config2?.getConfig())}</div>
//         <div>{JSON.stringify(config3?.getConfig())}</div>
//       </>
//     ))
// })

// export default () => {
//   const [random, setRandom] = React.useState(Math.random)

//   return (
//     <>
//       <Demo
//         // ref={}
//         normalProp={random}
//         coverable={{
//           b: 44,
//           test: {
//             c: 2,
//           },
//           // test: {
//           //   // a
//           //   // a: 2,
//           //   c: 3,
//           // },
//           apis: {
//             add: {
//               handleResponse: () => {
//                 return {
//                   test: 1,
//                 }
//               },
//             },
//             // other: {
//             //   add: ({  }) => {
//             //     console.log('Hello')
//             //   },
//             // },
//             // add: {},
//             // add: {
//             //   // url: ''
//             // },
//             // add: {
//             //   url
//             // }
//           },
//           // a: 1,
//           // config1: {
//           //   b: 666,
//           //   apis: {
//           //     add: {},
//           //     // add: {},
//           //     // add: {
//           //     //   // url: ''
//           //     // },
//           //     // add: {
//           //     //   url
//           //     // }
//           //   },
//           // },
//           config2: {
//             key: 66,
//             // config1: {
//             //   // b: 44,
//             // },
//           },
//           config3: {
//             foo: String(random),
//           },
//         }}
//       />
//       <button
//         onClick={() => {
//           setRandom(Math.random)
//         }}
//       >
//         random
//       </button>
//     </>
//   )
// }
