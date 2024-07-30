import { Random } from 'mockjs'
import dayjs from 'dayjs'

export const getMockData = () => {
  const dayjsNow = dayjs()
  const dayjs1 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))
  const dayjs2 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))
  const dayjs3 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))

  const getDate = (dayjs, name) => ({
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
    image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    ...getDate(dayjsNow, 'dayjsNow'),
    ...getDate(dayjs1, 'dayjs1'),
    ...getDate(dayjs2, 'dayjs2'),
    ...getDate(dayjs3, 'dayjs3'),
  }
}
