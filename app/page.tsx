import React, { useRef, useState } from "react";
import Image from "next/image";

import { ToastContainer } from "react-toastify";
import UploadPage from "./components/UploadPage";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Image
          alt="your image"
          src={"/images/Palace.jpg"}
          fill
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.backgroundImage}
        />
        <UploadPage />
      </main>
      <ToastContainer />
    </>
  );
}
