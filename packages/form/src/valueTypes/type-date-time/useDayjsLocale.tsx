import useLocales from '../../locales'

export default function useDayjsLocale() {
  const { localeKey } = useLocales(({ localeKey }) => [localeKey]) ?? {}

  return (
    {
      zh_CN: 'zh-cn',
      en_US: 'en',
      id_ID: 'id',
      ms_MY: 'ms-my',
      th_TH: 'th',
      'zh-CN': 'zh-cn',
      'en-US': 'en',
      'id-ID': 'id',
      'ms-MY': 'ms-my',
      'th-TH': 'th',
    }[localeKey as 'en_US'] ?? 'en'
  )
}
