import styles from './FooterPage.module.scss'
import Banner from '../../components/Banner/Banner'
import Footer from '../../components/Footer/Footer'

export default function FooterPage() {
  return (
    <div className={styles.container}>
      <Banner/>
      <Footer/>
    </div>
  )
}