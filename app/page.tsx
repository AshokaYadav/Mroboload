'use client'

import styles from "./Home.module.css"
import useAuthCheck from "@/hooks/useAuthCheck";

const Home: React.FC = () => {
  useAuthCheck();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to MRoboLoading....</h1>
      <p className={styles.subtitle}>Experience a new journey with us!</p>
    </div>
  );
}

export default Home;
