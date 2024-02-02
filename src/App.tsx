import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './App.module.scss'

import FullScreenMessage from './components/shared/FullScreenMessage'

import Heading from './components/sections/Heading'
import Video from './components/sections/Video'

import { Wedding } from './models/wedding'
import ImageGallery from './components/sections/ImageGallery'
import Intro from './components/sections/Intro'
import Invitation from './components/sections/Invitation'
import Calender from './components/sections/Calender'
import Map from './components/sections/Map'
import Contact from './components/sections/Contact'
import Share from './components/sections/Share'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null) // 데이터
  const [loading, setLoading] = useState(false) // 로딩
  const [error, setError] = useState(false) // 에러

  // 1. wedding 데이터 호출
  useEffect(() => {
    setLoading(true)

    fetch('http://localhost:8888/wedding')
      .then((response) => {
        // 에러 발생도 통신 완료로 여기기에 명시적으로 에러를 선언해주어야함
        if (response.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return response.json()
      })
      .then((data) => {
        setWedding(data)
      })
      .catch((e) => {
        console.log('에러발생', e)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // 로딩중일 경우
  if (loading) {
    return <FullScreenMessage type="loading" />
  }
  // 에러일 경우
  if (error) {
    return <FullScreenMessage type="error" />
  }
  if (wedding == null) {
    return null
  }
  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calender date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />
      {/* {JSON.stringify(wedding)} */}
    </div>
  )
}

export default App
