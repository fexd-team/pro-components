import { showTipsWithResponse } from '@fexd/pro-utils'

const handleAsyncActionResponse: typeof showTipsWithResponse = (...args) => showTipsWithResponse(...args)
export default handleAsyncActionResponse
