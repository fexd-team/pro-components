import React from 'react'
import { Alert } from 'antd'
import { CloseOutlined, CheckOutlined, FrownOutlined, LikeOutlined } from '@ant-design/icons'
import { classnames } from '@fexd/tools'

export default ({ good, bad, vertical = false }: { good: any; bad: any; vertical?: boolean }) => (
  <div className="p-6 w-full bg-gray-100">
    <div
      className={classnames('flex gap-6', {
        'flex-col': vertical,
      })}
    >
      <div
        className={classnames('p-6 bg-white flex-1', {
          'overflow-x-hidden': !vertical,
        })}
      >
        <div className="mb-5">
          <Alert
            message={bad?.title ?? '不推荐示例'}
            type="error"
            icon={<FrownOutlined style={{ fontSize: 18 }} />}
            showIcon
            // className="text-center"
          />
        </div>
        <div>{bad?.content ?? bad}</div>
      </div>
      <div
        className={classnames('p-6 bg-white flex-1', {
          'overflow-x-hidden': !vertical,
        })}
      >
        <div className="mb-5">
          <Alert
            message={good?.title ?? '推荐示例'}
            type="success"
            icon={<LikeOutlined style={{ fontSize: 18 }} />}
            showIcon
            // className="text-center"
          />
        </div>
        <div>{good?.content ?? good}</div>
      </div>
    </div>
  </div>
)
