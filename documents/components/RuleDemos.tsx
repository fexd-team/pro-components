/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo } from 'react'
import { Collapse, Space } from 'antd'
import { Hook, Action, showModal } from '@fexd/pro-components'
import { delay, random, run, classnames } from '@fexd/tools'
import {
  CloseOutlined,
  CheckOutlined,
  FrownOutlined,
  LikeOutlined,
  ReloadOutlined,
  LinkOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { Random } from 'mockjs'
import dayjs from 'dayjs'

import BadOrGood from './BadOrGood'

export const getMockData = () => {
  const dayjsNow = dayjs()
  const dayjs1 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))
  const dayjs2 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))
  const dayjs3 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))

  const getDate = (dayjs: any, name: string) => ({
    [name]: dayjs,
    [`${name}_timestamp`]: dayjs.valueOf(),
    [`${name}_YYYYMMDD`]: dayjs.format('YYYYMMDD'),
    [`${name}_YYYY-MM-DD`]: dayjs.format('YYYY-MM-DD'),
  })

  return {
    id: Random.id(),
    name: Random.name(),
    number: Random.float(0, 100000, 0, 3),
    digit: Random.float(0, 100000, 0, 3),
    percent: Random.float(0, 1.5, 0, 5),
    length: Random.float(0, 100000, 0, 3),
    weight: Random.float(0, 100000, 0, 3),
    price: Random.float(0, 100000, 0, 3),
    money: Random.float(0, 100000, 0, 3),
    paragraph: Random.paragraph(),
    cparagraph: Random.cparagraph(),
    sentence: Random.sentence(),
    csentence: Random.csentence(),
    title: Random.title(),
    ctitle: Random.ctitle(),
    ...getDate(dayjsNow, 'dayjsNow'),
    ...getDate(dayjs1, 'dayjs1'),
    ...getDate(dayjs2, 'dayjs2'),
    ...getDate(dayjs3, 'dayjs3'),
  }
}

function RuleDemos({
  demoNamePrefix = '示例',
  demos: propDemos,
  className,
  mockDataLength = 5,
}: {
  demoNamePrefix?: string
  className?: string
  mockDataLength?: number
  demos: {
    name?: string
    bad: any
    good: any
    refresh?: boolean
    vertical?: boolean
    content?: any
    link?: string
    defaultShow?: boolean
    mockDataLength?: number
  }[]
}) {
  const [demoDataKeys, setDemoDataKeys] = useSetState<any>({})
  const demos = useMemo(
    () =>
      propDemos.map((demo, idx) => ({
        key: `${demo?.name}${idx}`,
        ...demo,
      })),
    [propDemos],
  )
  const [activeKey, setActiveKey] = useState<any>(demos.find((demo) => demo?.defaultShow)?.key)

  return (
    <div className="my-6 border border-gray-200 border-solid rounded-sm">
      <Collapse activeKey={activeKey} accordion ghost onChange={setActiveKey}>
        {demos.map((demo, idx) => (
          <Collapse.Panel
            header={
              <Space split=" - ">
                {demoNamePrefix && <span>{`${demoNamePrefix} ${idx + 1}`}</span>}
                {demo?.link ? (
                  <span>
                    {/* <a target="_blank" rel="noreferrer" href={demo?.link}></a> */}
                    <Action
                      className="ml-2"
                      size="small"
                      type="link"
                      icon={<LinkOutlined />}
                      // tooltip="弹窗查看"
                      onClick={(e: any) => {
                        run(e, 'stopPropagation')
                        showModal({
                          defaultFullscreen: true,
                          title: demo?.name,
                          bodyStyle: {
                            padding: 0,
                            overflow: 'hidden',
                          },
                          content: (
                            <Hook>
                              {() => {
                                const [ready, setReady] = React.useState(false)

                                React.useEffect(() => {
                                  setTimeout(() => setReady(true), 300)
                                }, [])

                                return ready ? (
                                  <iframe
                                    src={demo?.link}
                                    width="100%"
                                    style={{
                                      height: '100%',
                                      minHeight: '70vh',
                                      border: 'solid 1px #f5f5f5',
                                    }}
                                  />
                                ) : null
                              }}
                            </Hook>
                          ),
                          actions: null,
                        })
                      }}
                    >
                      {demo?.name}
                    </Action>
                  </span>
                ) : (
                  demo?.name
                )}
              </Space>
            }
            key={demo?.key}
            extra={
              (demo?.refresh ?? false) &&
              activeKey?.[0] === `${demo?.name}${idx}` && (
                <Action
                  type="text"
                  icon={<ReloadOutlined />}
                  tooltip="刷新示例"
                  onClick={async (e: any) => {
                    run(e, 'stopPropagation')
                    // await delay(100)
                    setDemoDataKeys({
                      [idx]: random(0, 100000),
                    })
                  }}
                />
              )
            }
            // className={classnames()}
          >
            <Hook key={demoDataKeys?.[idx]}>
              {() => {
                const mockData = useMemo(
                  () => ({
                    ...getMockData(),
                    list: Array(demo?.mockDataLength ?? mockDataLength)
                      .fill('')
                      .map(getMockData),
                  }),
                  [],
                )

                return (
                  (demo?.content && run(demo?.content, undefined, mockData)) ??
                  (demo?.link ? (
                    <iframe
                      src={demo?.link}
                      width="100%"
                      style={{
                        height: '70vh',
                        border: 'solid 1px #f5f5f5',
                      }}
                    />
                  ) : (
                    <BadOrGood
                      bad={run(demo?.bad, undefined, mockData)}
                      good={run(demo?.good, undefined, mockData)}
                      vertical={demo?.vertical}
                    />
                  ))
                )
              }}
            </Hook>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default RuleDemos
