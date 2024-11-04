import React from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/home/hero-section.module.css";
import Photo3 from "../../../../public/blender.png";
import Photo4 from "../../../../public/headphone.png";
import Photo5 from "../../../../public/laptop.png";
import Image from "next/image";

function HeroSection() {
  const router = useRouter();

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.sideMenu}>
            <div className={styles.header}>
              <h1>All Categories</h1>
            </div>
            <hr />

            <div className={styles.menuLinks}>
              <div className={styles.link}>
                <h1>1</h1>
                <h1>Fashion</h1>
              </div>

              <div className={styles.link}>
                <h1>2</h1>
                <h1>Home Appliances</h1>
              </div>

              <div className={styles.link}>
                <h1>3</h1>
                <h1>Shoes</h1>
              </div>

              <div className={styles.link}>
                <h1>4</h1>
                <h1>Sneakers</h1>
              </div>

              <div
                className={styles.link}
                onClick={() =>
                  router.push({
                    pathname: "/list",
                    query: { category: "electronics", title: "Electronics" }
                  })
                }
              >
                <h1>5</h1>
                <h1>Electronics</h1>
              </div>

              <div className={styles.link}>
                <h1>6</h1>
                <h1>Laptops</h1>
              </div>

              <div className={styles.link}>
                <h1>7</h1>
                <h1>Apple Phones</h1>
              </div>

              <div className={styles.link}>
                <h1>8</h1>
                <h1>Android Phones</h1>
              </div>
            </div>
          </div>
          <div className={styles.showcase}>
            <div className={styles.discount}>
              <h1>-30%</h1>
            </div>
            <div className={styles.image}>
              <Image src={Photo5} width={900} height={900} alt="" />
            </div>

            <div className={styles.showcaseDescription}>
              <h1>Shop With</h1>
              <h1>darlington</h1>
            </div>

            <div className={styles.shopnow}>
              <button>Shop Now</button>
            </div>
          </div>

          <div className={styles.showcaseGrid}>
            <div className={styles.grid1}>
              <div className={styles.image}>
                <Image src={Photo3} width={900} height={900} alt="" />
              </div>
            </div>
            <div className={styles.grid2}>
              <div className={styles.image}>
                <Image src={Photo4} width={900} height={900} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
