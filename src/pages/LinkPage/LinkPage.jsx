import Swal from 'sweetalert2';
import styles from './LinkPage.module.scss'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function LinkPage() {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  const handleBrowseAll = () => {
    // 導向BrowseAllPage
    if (isAuthenticated) {
      navigate("/browse/all");
      window.scrollTo(0, 0);
    } else {
      Swal.fire({
        toast: true,
        position: "top",
        title: "Please Login first",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
        confirmButtonText: "OK",
      });

      navigate("/login");

      const loginElement = document.getElementById("login");
      if (loginElement) {
        loginElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.containWrapper}>
        <p className={styles.title}>Ready for savory memories?</p>
        <div className={styles.btnWrapper}>
          <button
            className={styles.btn + " " + styles.btnGreen}
            onClick={handleBrowseAll}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}