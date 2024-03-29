import { SearchOutlined } from '@ant-design/icons'
import { useSiteSearch } from 'dumi'
import SearchResult from 'dumi/theme-default/slots/SearchResult'
import React, { useEffect, useRef, useState, FC } from 'react'

import { Input } from 'dumi-theme-antd-style/dist/slots/SearchBar/Input'
import { Mask } from 'dumi-theme-antd-style/dist/slots/SearchBar/Mask'
import { useStyles } from 'dumi-theme-antd-style/dist/slots/SearchBar/style'

export { Input as SearchInput } from 'dumi-theme-antd-style/dist/slots/SearchBar/Input'
export { Mask as SearchMask } from 'dumi-theme-antd-style/dist/slots/SearchBar/Mask'

const isAppleDevice = /(mac|iphone|ipod|ipad)/i.test(typeof navigator !== 'undefined' ? navigator?.platform : '')

const isInput = (target: HTMLElement) =>
  ['TEXTAREA', 'INPUT'].includes(target.tagName) || target.contentEditable === 'true'

const SearchBar: FC = () => {
  const { styles } = useStyles()
  const [focusing, setFocusing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalInputRef = useRef<HTMLInputElement>(null)
  const [symbol, setSymbol] = useState('⌘')
  const { keywords, setKeywords, result, loading } = useSiteSearch()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    // why put useEffect?
    // to avoid Text content mismatch between server & client in ssr
    if (!isAppleDevice) {
      setSymbol('Ctrl')
    }

    const handler = (ev: KeyboardEvent) => {
      if (
        ((isAppleDevice ? ev.metaKey : ev.ctrlKey) && ev.key === 'k') ||
        (ev.key === '/' && !isInput(ev.target as HTMLElement))
      ) {
        ev.preventDefault()

        if (inputRef.current) {
          const { top, bottom, left, right } = inputRef.current.getBoundingClientRect()
          const isInViewport = top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth

          if (isInViewport) {
            inputRef.current.focus()
          } else {
            setKeywords('')
            setModalVisible(true)
            setTimeout(() => {
              modalInputRef.current?.focus()
            })
          }
        }
      }

      if (ev.key === 'Escape') {
        ev.preventDefault()
        setModalVisible(false)
      }
    }

    document.addEventListener('keydown', handler)

    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={styles.container}>
      <SearchOutlined className={styles.svg} />
      <Input
        onFocus={() => setFocusing(true)}
        onBlur={() => {
          // wait for item click
          setTimeout(() => {
            setFocusing(false)
          }, 1)
        }}
        onChange={(keywords) => setKeywords(keywords)}
        ref={inputRef}
        className={styles.input}
      />
      <span className={styles.shortcut}>{symbol} K</span>
      {keywords.trim() && focusing && (result.length || !loading) && !modalVisible && (
        <div className={styles.popover}>
          <section>
            <SearchResult data={result} loading={loading} />
          </section>
        </div>
      )}

      <Mask
        visible={modalVisible}
        onMaskClick={() => {
          setModalVisible(false)
        }}
        onClose={() => setKeywords('')}
      >
        <div style={{ position: 'relative' }}>
          <SearchOutlined className={styles.svg} />
          <Input
            className={styles.input}
            onFocus={() => setFocusing(true)}
            onBlur={() => {
              // wait for item click
              setTimeout(() => {
                setFocusing(false)
              }, 1)
            }}
            onChange={(keywords) => setKeywords(keywords)}
            ref={modalInputRef}
          />
        </div>

        <SearchResult
          data={result}
          loading={loading}
          onItemSelect={() => {
            setModalVisible(false)
          }}
        />
      </Mask>
    </div>
  )
}

export default SearchBar
