import styles from './BrowsePage.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'
// import SearchBar from '../../components/SearchBar/SearchBar'

export default function BrowsePage() {

  const cards = Array(6)
    .fill()
    .map((_,index) => <Card key={index} />);


  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.searchBar}>
        </div>
        <div className={styles.cardWrapper}>  
          {cards}
        </div>
      </div>
      <div className={styles.navigator}>
        <Pagination />
      </div>
      <Footer />
    </>
  );
}