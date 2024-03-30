"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./UploadPage.module.css";

type uploadedItem = File;
const UploadPage = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setuploadedFiles] = useState<uploadedItem[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const handleUploadItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFilesArray = Array.from(files); // Convert FileList to array

      setuploadedFiles((prev) => [...prev, ...newFilesArray]);

      const newThumbnails = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setThumbnails((prev) => [...prev, ...newThumbnails]);
    }
  };

  const handleDeleteItem = (name: string) => {
    const deletedFile = uploadedFiles.find((file) => file.name === name);
    if (deletedFile) {
      setuploadedFiles((prev) =>
        prev.filter((file) => file.name !== deletedFile.name)
      );

      setThumbnails((prev) =>
        prev.filter((_, index) => uploadedFiles[index].name !== name)
      );
    }
  };

  const handleClearAll = () => {
    setuploadedFiles([]);
    setThumbnails([]);
    toast.info(<span style={{ fontSize: "12px" }}>{`All Cleared`}</span>, {
      autoClose: 1000,
    });
  };
  return (
    <>
      <section className={styles.middleBox}>
        <div className={styles.boxHeader}>
          <Typography>
            {uploadedFiles.length
              ? `${uploadedFiles.length} Uploaded`
              : `Upload your entries for the Wackiest shot`}
          </Typography>
          {!!uploadedFiles.length && (
            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                color: "#333333",
                borderRadius: "10px",
                fontSize: "12px",
                borderColor: "#333333",
              }}
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          )}
        </div>
        <div className={styles.boxContent}>
          {uploadedFiles.map((file, index) => (
            <UploadedItem
              key={`${file.name}-${index}`}
              file={file}
              thumbnail={thumbnails[index]}
              handleDelete={() => handleDeleteItem(file.name)}
            />
          ))}
        </div>
        <div className={styles.boxFooter}>
          <input
            ref={inputFileRef}
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            accept="image/*"
            multiple
            onChange={handleUploadItem}
          />

          <Button
            variant="contained"
            style={{
              flex: "1",
              textTransform: "none",
              background: "#333333",
              borderRadius: "10px",
              fontSize: "12px",
            }}
            endIcon={<AddIcon />}
            onClick={() => {
              if (inputFileRef.current) inputFileRef.current.click();
            }}
          >
            {uploadedFiles.length ? "Upload More" : "Upload"}
          </Button>
          {/* <Button
          variant="contained"
          style={{
            flex: "1",
            textTransform: "none",
            background: "#333333",
            borderRadius: "10px",
            fontSize: "12px",
          }}
        >
          Submit
        </Button> */}
        </div>
      </section>
    </>
  );
};

const UploadedItem = ({
  file,
  handleDelete,
  thumbnail,
}: {
  file: File;
  handleDelete: () => void;
  thumbnail: string;
}) => {
  const { name, lastModified } = file;

  const date = new Date(lastModified);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const formattedDate = `${days[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()} ${formattedHours}:${minutes} ${ampm}`;

  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap="16px"
      padding="16px"
      border="1px solid #f2f2f2"
      position="relative"
    >
      <Box position="relative" height="40px" width="40px" borderRadius="3px">
        <Image alt="your image" src={thumbnail} fill quality={100}/>
      </Box>
      <Stack>
        <Box
          color="#424242"
          fontWeight="500"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          maxWidth="240px"
        >
          {name}
        </Box>
        <Box color="#d7d7d7" fontWeight="600">
          {formattedDate}
        </Box>
      </Stack>
      <Box marginLeft="auto">
        <IconButton size="small" onClick={() => handleDelete()}>
          <ClearIcon color="error" fontSize="small" />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default UploadPage;
