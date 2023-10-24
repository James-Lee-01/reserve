import styles from './BrowsePage.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'

export default function BrowsePage() {

  const cards = Array(6)
    .fill()
    .map((index) => <Card key={index} />);


  return (
    <>
      <Navbar />
      <div className={styles.container}>{cards}</div>
      <div className={styles.navigator}>
        <Pagination />
      </div>
      <Footer/>
    </>
  );
}