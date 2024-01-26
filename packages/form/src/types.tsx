import { ReactNode, Ref } from 'react'
import {
  TableProps,
  FormItemProps,
  TableColumnType,
  ButtonProps,
  PopconfirmProps,
  TooltipProps,
  FormProps,
  FormInstance,
  TagProps,
  BadgeProps,
  ColProps,
  ModalProps,
  SwitchProps,
  SelectProps,
  InputProps,
  InputNumberProps,
  DatePickerProps,
  UploadProps,
  TimePickerProps,
  TimeRangePickerProps,
  RadioGroupProps,
  TreeSelectProps,
  TransferProps,
  CascaderProps,
  CheckboxProps,
  RadioProps,
  RateProps,
  DescriptionsProps,
  SpaceProps,
  RowProps,
} from 'antd'
import { DescriptionsItemProps } from 'antd/es/descriptions/Item'
import { CheckboxGroupProps } from 'antd/es/checkbox'
import { TextAreaProps } from 'antd/es/input/TextArea'
import { PresetColorType, PresetStatusColorType } from 'antd/es/_util/colors'
import { SliderSingleProps, SliderRangeProps } from 'antd/es/slider'
import { Options as UseRequestOptions, Result as UseRequestResult } from 'ahooks/es/useRequest/src/types'
import { ConfirmConfig, TooltipConfig, UniteOmit, ShowModalConfig, GridProps } from '@fexd/pro-utils'
import { ConfigProviderProps } from '@fexd/pro-provider'
import { Options as UseInViewportOptions } from 'ahooks/es/useInViewport'
import { DebounceOptions } from 'ahooks/es/useDebounce/debounceOptions'
import { Optional } from 'utility-types'

import { BuiltInValueTypeKeys } from './valueTypes'

// export type UniteOmit<T extends U, U extends string = string> = T | Omit<U, T>

export type ProFieldValueTypes = BuiltInValueTypeKeys

export interface ProFieldItemProps extends FormItemProps {
  key?: any
}

type BuiltInRule = UniteOmit<'same-month' | 'days-span', string>

interface ModalSelectProps {
  getModalConfig: (params: {
    setValue: (value: ProFieldOptionObjectType | ProFieldOptionObjectType[]) => any
    destroy: () => void
  }) => ShowModalConfig
}

interface BuiltInHookParams {
  [key: string]: any
  form: FormInstance<any>
}

export interface ProFieldValueFieldType extends Pick<ConfigProviderProps, 'numberLocale' | 'currencyLocale'> {}

export interface ProFieldValueFieldType extends Omit<ProFieldItemProps, 'required'> {
  mode?: 'view' | 'edit'
  value?: any
  tooltip?: TooltipConfig
  builtInRule?:
    | BuiltInRule
    | {
        [key: string]: any
        name: BuiltInRule
      }
  props?: // | Record<string, any>
  | SwitchProps
    | SelectProps
    | InputProps
    | InputNumberProps
    | DatePickerProps
    | TimePickerProps
    | TimeRangePickerProps
    | RadioGroupProps
    | TreeSelectProps
    | TransferProps<any>
    | CascaderProps<any>
    | RateProps
    | CheckboxGroupProps
    | TextAreaProps
    | SliderSingleProps
    | SliderRangeProps
    | ModalSelectProps
    | UploadProps
  form?: FormInstance<any> | false
  fromNowTooltip?: boolean
  format?: string
  unit?: string
  digits?: number
  fieldItemProps?: ProFieldItemProps
  type?: ProFieldValueTypes
  options?:
    | ProFieldOptionType[]
    | (() => Promise<ProFieldOptionType[]>)
    | UseRequestResult<any, any>
    | Record<string | number | symbol, Omit<ProFieldOptionType, 'value'> | string | ReactNode>
  // fallbackShowValue?: boolean
  renderField?: (renderParams?: {
    fieldProps?: ProFieldValueFieldType['props'] & {
      fromNowTooltip: ProFieldValueFieldType['fromNowTooltip']
      format: ProFieldValueFieldType['format']
      unit: ProFieldValueFieldType['unit']
      builtInRule: ProFieldValueFieldType['builtInRule']
      numberLocale: ProFieldValueFieldType['numberLocale']
      currencyLocale: ProFieldValueFieldType['currencyLocale']
      options: ProFieldValueFieldType['options']
    }
    field?: ProFieldValueFieldType
    modalStationId?: string
  }) => ReactNode
  renderView?: (value: any, config: ProFieldValueFieldType) => ReactNode
  disabled?: boolean
  required?: boolean | string
  hook?: (
    hookParams: BuiltInHookParams,
    ...args: any[]
  ) => Omit<ProFieldValueFieldType, 'hook' | 'name'> | void | undefined | null | boolean | ReactNode
  copyable?: boolean | ConfirmConfig | TooltipConfig
  placeholder?: any | any[]
  colSpan?: ColProps['span']
  lazyRender?: boolean | UseInViewportOptions | DebounceOptions
}

export type ProFieldOptionValueType = string | number | boolean

export type ProFieldOptionObjectType = {
  title?: any
  description?: any
  label: string | ReactNode
  value: ProFieldOptionValueType
  disabled?: boolean
  tag?: UniteOmit<PresetColorType | PresetStatusColorType> | TagProps
  badge?: UniteOmit<PresetColorType | PresetStatusColorType> | BadgeProps
  children?: ProFieldOptionType[]
}
export type ProFieldOptionType = ProFieldOptionObjectType | ProFieldOptionValueType

export type NamePath = FormItemProps['name']
export interface RenderFieldsConfig extends GridProps {
  /** 动态控制，根据 field?.hook 计算结果决定是否渲染该区域，若不渲染则销毁其占位，开启后可能会造成初始渲染抖动 */
  gridDynamicRender?: boolean
  /** 是否通过二维数组自由布局 */
  freeLayout?: boolean
}
export interface ProFormRenderDescriptionParams {
  /** 动态控制，根据 field?.hook 计算结果决定是否渲染该区域，若不渲染则销毁其占位，开启后可能会造成初始渲染抖动  */
  gridDynamicRender?: boolean
  configs?: (ProFieldValueFieldType | NamePath)[]
  filter?: (item: ProFieldValueFieldType) => boolean
  sort?: (prev: ProFieldValueFieldType, next: ProFieldValueFieldType) => number | undefined | void
  descriptionsProps?: DescriptionsProps
  descriptionsItemProps?: DescriptionsItemProps | ((field: ProFieldValueFieldType) => Optional<DescriptionsItemProps>)
}

export interface ProFormInternalParams<T = ProFieldValueFieldType> {
  renderField: (field: Omit<T, 'type'> | NamePath, overrideConfig?: Omit<T, 'name' | 'type'>) => ReactNode
  renderFields: (
    fields?: ((T | NamePath) | ReactNode)[] | ((T | NamePath) | ReactNode)[][],
    config?: RenderFieldsConfig,
  ) => ReactNode
  renderDescriptions: (param?: ProFormRenderDescriptionParams) => ReactNode
  form: FormInstance
  antdFormRef: React.RefObject<FormInstance>
  fieldsMapRef: React.RefObject<Record<string, any>>
  getValues: FormInstance['validateFields']
  fieldsMap: Record<string, ProFieldValueFieldType>
}

export interface ProFormRenderParams<T = ProFieldValueFieldType> extends ProFormInternalParams<T> {}

export interface ProFormProps extends Omit<FormProps, 'fields'> {
  mode?: 'view' | 'edit'
  fields?: ProFieldValueFieldType[] | ProFieldValueFieldType[][]
  normalizeFieldValue?: boolean
  gridColumns?: number
  gridGutter?: RowProps['gutter']
  /** 动态控制，根据 field?.hook 计算结果决定是否渲染该区域，若不渲染则销毁其占位，开启后可能会造成初始渲染抖动 */
  gridDynamicRender?: boolean
  render?:
    | ((renderParams: ProFormRenderParams) => React.ReactNode)
    | ProFormProps['fields']
    | ((ProFieldValueFieldType | NamePath) | ReactNode)[]
    | ((ProFieldValueFieldType | NamePath) | ReactNode)[][]
  children?: React.ReactNode | ProFormProps['render']
  filterEmptyParam?: boolean
  sharedFieldProps?: ProFieldValueFieldType
}

export type ProFormRef = ProFormInternalParams

// const obj: ProFieldOptionObjectType = {} as any
// obj.tag = 'blue'

// 'password'
// 'money'
// 'textarea'
// 'date'
// 'dateTime'
// 'dateWeek'
// 'dateMonth'
// 'dateQuarter'
// 'dateYear'
// 'dateRange'
// 'dateTimeRange'
// 'time'
// 'timeRange'
// 'text'
// 'select'
// 'multipleSelect'
// 'treeSelect'
// 'multipleTreeSelect'
// 'checkbox'
// 'rate'
// 'radio'
// 'radioButton'
// 'digit'
// 'switch'
// 'cascader'
// 'transfer'
