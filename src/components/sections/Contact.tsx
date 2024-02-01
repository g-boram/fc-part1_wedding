import classNames from 'classnames/bind'
import Section from '@shared/Section'
import styles from './Contact.module.scss'
import Accordion from '../shared/Accordion'

const cx = classNames.bind(styles)

function Contact() {
  return (
    <Section title="연락처 및 마음 전하실 곳">
      <Accordion label="신랑측" />
      <Accordion label="신부측" />
    </Section>
  )
}

export default Contact
// https://qr.kakaopay.com/Ej8S0Nulk
