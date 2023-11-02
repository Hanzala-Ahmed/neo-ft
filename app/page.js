"use client";
import Header from "@/components/core/molecules/Header";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";


export default function Home() {
  const themeMode = useSelector((state) => state.theme.themeMode);

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundColor: themeMode === "light" ? "#fff" : "#171717",
    }}>
      <Header />
    </Box>
  );
}
