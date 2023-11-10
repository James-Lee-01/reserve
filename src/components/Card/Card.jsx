import styles from './Card.module.scss'
import cafe1 from '../../assets/images/cafe1.jpeg'

export default function Card({ id, cover, cafeName, city, intro }) {
  return (
    <div id={id} className={styles.container}>
      <img
        className={styles.cafeCover}
        src={cover || cafe1}
        alt={`cafe${id}`}
      />
      <div className={styles.contentContainer}>
        <h3 className={styles.cafeName}>{cafeName || "Cafe Name"}</h3>
        <div className={styles.cafeCity}>
          <p>{city || "Europe"}</p>
        </div>
        <p className={styles.cafeIntro}>{intro || "Intro here"}</p>
      </div>
    </div>
  );
}

// ////Lazy Loading Card
// import styles from "./Card.module.scss";
// import cafe1 from "../../assets/images/cafe1.jpeg";
// import { useState, useEffect, useRef } from "react";

// export default function Card({ id, cover, cafeName, city, intro }) {
//   const [imageSrc, setImageSrc] = useState(null);
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(handleIntersection, {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.1, // 卡片進入視線10%時載入
//     });

//     if (imageRef.current) {
//       observer.observe(imageRef.current);
//     }

//     return () => {
//       if (imageRef.current) {
//         observer.unobserve(imageRef.current);
//       }
//     };
//   }, []);

//   const handleIntersection = (entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting && cover) {
//         // 圖片進入視線範圍而載入
//         setImageSrc(cover);
//         observer.unobserve(imageRef.current);
//       }
//     });
//   };

//   return (
//     <div id={id} className={styles.container}>
//       <img
//         ref={imageRef}
//         className={styles.cafeCover}
//         src={imageSrc || cafe1}
//         data-src={cover}
//         alt={`cafe${id}`}
//       />
//       <div className={styles.contentContainer}>
//         <h3 className={styles.cafeName}>{cafeName || "Cafe Name"}</h3>
//         <div className={styles.cafeCity}>
//           <p>{city || "Europe"}</p>
//         </div>
//         <p className={styles.cafeIntro}>{intro || "Intro here"}</p>
//       </div>
//     </div>
//   );
// }
