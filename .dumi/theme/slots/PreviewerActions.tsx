import React, { useMemo } from 'react'
import PreviewerActions, { IPreviewerActionsProps } from 'dumi/theme-default/slots/PreviewerActions'

export default function OverridedPreviewerActions({ demoUrl, ...props }: IPreviewerActionsProps) {
  const fixedDemoUrl = useMemo(() => demoUrl.replace(/\/~demos\//, `${window.location.pathname}#/~demos/`), [demoUrl])

  return <PreviewerActions {...props} demoUrl={fixedDemoUrl} />
}
