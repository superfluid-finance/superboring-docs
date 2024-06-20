import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [selectedOption, setSelectedOption] = useState("");

  const items = [
    { label: "The Basics of SuperBoring", value: "/docs/" },
    { label: "The Architecture of SuperBoring", value: "/docs/architecture" },
    { label: "TOREX (Twap Oracle Exchange)", value: "/docs/torex" },
    // Add more items here
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleGoClick = () => {
    if (selectedOption) {
      window.location.href = selectedOption;
    }
  };

  return (
    <Layout>
      <div className={styles.backgroundContainer}>
        <main className={styles.content}>
          <img src="/img/logo.svg" alt="Site Logo" className={styles.logo} />
          <p className={styles.description}>
            Welcome to the not-so-boring documentation of SuperBoring!
          </p>
          <div className={styles.card}>
            <p className={styles.cardText}>I want to learn about...</p>
            <ul className={styles.list}>
              {items.map((item) => (
                <li
                  key={item.value}
                  className={`${styles.listItem} ${
                    selectedOption === item.value ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionClick(item.value)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <button className={styles.goButton} onClick={handleGoClick}>
              Let's Go!
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
}
