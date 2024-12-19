import studyImage from '../image/root/공부의숲3x.png';

import Image from "next/image";
import styles from "./page.module.css";


export default function Home()
{
  return (
    <div id={styles.IMain}>
      <div className={styles.CNav}>
        <div className={styles.CImage}>
          <Image src={studyImage} alt='공부의숲' />
        </div>
        <div>
          <input className={`${styles.CTitle} ${styles.CButtonFont}`} type='button' value="공부방 만들기" />
        </div>
      </div>
    </div>

  );
}
