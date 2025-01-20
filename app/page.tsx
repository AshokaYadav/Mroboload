'use client'
import { useEffect } from "react";
import styles from "./Home.module.css"

const Home: React.FC = () => {
  useEffect(() => {
    // Any animation or JS logic can go here if needed
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to MRoboLoading....</h1>
      <p className={styles.subtitle}>Experience a new journey with us!</p>
    </div>
  );
}

export default Home;
