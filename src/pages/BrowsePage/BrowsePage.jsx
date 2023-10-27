import styles from './BrowsePage.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'
// import SearchBar from '../../components/SearchBar/SearchBar'
import { useState } from 'react'

export default function BrowsePage() {

  const cards = Array(20)
    .fill()
    .map((_,index) => <Card key={index} />);

  //Pagination count
  const itemPerPage = 6
  const totalPages = Math.ceil(cards.length / itemPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (event,value) => {
    //Signature:function(event: React.ChangeEvent, page: number) => void
    // event The event source of the callback.
    // page The page selected.
    setCurrentPage(value)
  } 

  //separate cards (range)
  const startIndex = (currentPage - 1) * itemPerPage
  const endIndex = Math.min(startIndex + itemPerPage, cards.length)

  //range render on screen
  const currentPageCards = cards.slice(startIndex, endIndex)



  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.searchBar}></div>
        <div className={styles.cardWrapper}>{currentPageCards}</div>
      </div>
      <div className={styles.navigator}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}/>
      </div>
      <Footer />
    </>
  );
}