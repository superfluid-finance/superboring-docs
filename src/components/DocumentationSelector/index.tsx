import React, { useState } from "react";
import styles from "./styles.module.css"; // Update the path if needed

const DocumentationSelector = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const items = [
    { label: "The Basics of SuperBoring", value: "/docs/" },
    { label: "The Architecture of SuperBoring", value: "/docs/architecture" },
    { label: "TOREX (Twap Oracle Exchange)", value: "/docs/torex" },
    { label: "The $BORING token", value: "/docs/boring" },
    { label: "How do referrals work?", value: "/docs/referrals" },
    { label: "Other FAQ", value: "/docs/faq" },
  ];

  const handleOptionClick = (option) => {
    window.location.href = option;
  };

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <img src="/img/logo.svg" alt="Site Logo" className={styles.logo} />
        <p className={styles.description}>
          Welcome to the not-so-boring documentation of SuperBoring!
        </p>
        <div className={styles.card}>
          <p className={styles.cardText}>I'm bored and want to learn about...</p>
          <ul className={styles.list}>
            {items.map((item) => (
              <li
                key={item.value}
                className={`${styles.listItem}`}
                onClick={() => handleOptionClick(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DocumentationSelector;
