import React from "react";
import styles from "../../../styles/home/hero-section.module.css";
import Photo from "../../../../public/cybertruck.png";
import Photo1 from "../../../../public/sneaker.png";
import Photo2 from "../../../../public/shirt.png";
import Image from "next/image";

function HeroSection() {
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

              <div className={styles.link}>
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
              <Image src={Photo} width={900} height={900} alt="" />
            </div>

            <div className={styles.showcaseDescription}>
              <h1>Furniture</h1>
              <h1>Wood Style</h1>
            </div>

            <div className={styles.shopnow}>
              <button>Shop Now</button>
            </div>
          </div>

          <div className={styles.showcaseGrid}>
            <div className={styles.grid1}>
              <div className={styles.image}>
                <Image src={Photo1} width={900} height={900} alt="" />
              </div>
            </div>
            <div className={styles.grid2}>
              <div className={styles.image}>
                <Image src={Photo2} width={900} height={900} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
