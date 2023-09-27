import styles from './BrowsePage.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'

export default function BrowsePage() {

  const cards = Array(12)
    .fill()
    .map((index) => <Card key={index} />);


  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {cards}
      </div>
    </>
  );
}