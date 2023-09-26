import styles from './BrowsePage.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'

export default function BrowsePage() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Card/>
        {/* <Card/>
        <Card/>
        <Card/> */}
      </div>
    </>
  );
}