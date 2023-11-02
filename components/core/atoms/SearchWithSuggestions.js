import { serahcItems } from "@/utils/constants";
import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useOnClickOutside } from "usehooks-ts";

export default function SearchWithSuggestions() {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const ref = useRef();

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = serahcItems.filter((item) => {});

  useOnClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    if (value) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [value]);

  return (
    <div className="searchMainBox" ref={ref}>
      <SearchMainBox
        sx={{
          border: themeMode === "light" && "1px solid #EBF0F080",
          backgroundColor: themeMode === "light" ? "#EBF0F080" : "transparent",
        }}
      >
        <Search />
        <input
          className="searchInput"
          placeholder="Search..."
          value={value}
          style={{
            color: themeMode === "light" ? "#000" : "#fff",
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {value && open && (
          <TotalLengthBox
            sx={{
              border:
                themeMode === "light"
                  ? "1px solid #CFDBD5"
                  : "1px solid #EBF0F01A",
            }}
            onClick={() => setValue("")}
          >
            Clear
            <LengthTextBox
              sx={{
                border:
                  themeMode === "light" ? "1px solid #000" : "1px solid #fff",
              }}
            >
              5
            </LengthTextBox>
          </TotalLengthBox>
        )}
      </SearchMainBox>
      {value && open && (
        <ResultsMainBox
          sx={{
            backgroundColor: themeMode === "light" ? "#fff" : "#272727",
            border:
              themeMode === "light" ? "1px solid #000" : "1px solid #FFFFFF80",
            color: themeMode === "light" ? "#000" : "#fff",
          }}
        >
          {serahcItems.map((item) => {
            return (
              <>
                {item.type == "collections" && (
                  <div>
                    {" "}
                    <SearchTypeTypography>Collections</SearchTypeTypography>
                    {item.collections?.map((collection, ind) => {
                      return (
                        <CollectionMainBox
                          sx={{
                            borderBottom:
                              ind !== item.collections.length - 1 &&
                              "1px solid rgba(207, 219, 213, 0.15)",
                          }}
                          key={ind}
                        >
                          <CollectionBox>
                            <Image
                              src={"/static/collectionImg.svg"}
                              width={30}
                              height={30}
                            />
                            <CollectionNameTypography>
                              {collection.name}
                            </CollectionNameTypography>
                          </CollectionBox>
                          <CollectionCountBox>
                            <Image
                              src={"/static/doubleArrow.svg"}
                              width={14}
                              height={14}
                              style={{ color: "white" }}
                            />
                            <CollectionCountTypography>
                              {collection.items} items
                            </CollectionCountTypography>
                          </CollectionCountBox>
                        </CollectionMainBox>
                      );
                    })}
                  </div>
                )}
                {item.type == "profiles" && (
                  <div>
                    {" "}
                    <SearchTypeTypography>Profiles</SearchTypeTypography>
                    {item.profiles.map((profile, ind) => {
                      return (
                        <>
                          <CollectionMainBox
                            sx={{
                              borderBottom:
                                ind !== item.profiles.length - 1 &&
                                "1px solid rgba(207, 219, 213, 0.15)",
                            }}
                            key={ind}
                          >
                            <CollectionBox>
                              <Image
                                src={"/static/collectionImg.svg"}
                                width={30}
                                height={30}
                                style={{}}
                              />
                              <CollectionNameTypography>
                                {profile.name}
                              </CollectionNameTypography>
                            </CollectionBox>
                          </CollectionMainBox>
                        </>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })}
          <div>
            <SeeAllMainBox>
              <SeeAllTypography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                See all results
              </SeeAllTypography>
            </SeeAllMainBox>
          </div>
        </ResultsMainBox>
      )}
    </div>
  );
}

const SearchMainBox = styled(Box)(({ theme }) => ({
  display: "none",
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    display: "flex",
  },
  alignItems: "center",
  padding: "0 3px 0px 12px",
  width: "400px",
  height: "40px",
  borderRadius: "30px",
  gap: "10px",
}));

const TotalLengthBox = styled(Box)(({ theme }) => ({
  padding: "5px 10px",
  borderRadius: "30px",
  fontSize: "10px",
  fontWeight: "700",
  gap: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

const LengthTextBox = styled(Box)(({ theme }) => ({
  padding: "0px 7px",
  height: "70%",
  borderRadius: "6px",
  fontSize: "10px",
}));

const ResultsMainBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  padding: "16px 14px",
  minHeight: "50px",
  marginTop: "10px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const SearchTypeTypography = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontSize: "14px",
}));

const CollectionMainBox = styled(Box)(({ theme }) => ({
  padding: "12px 0px",
  display: "flex",
  gap: "10px",
  justifyContent: "space-between",
}));

const CollectionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "3px",
  alignItems: "center",
}));

const CollectionNameTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "700",
  marginLeft: "10px",
}));

const CollectionCountBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "4px",
  alignItems: "center",
}));

const CollectionCountTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "700",
  marginLeft: "10px",
}));

const SeeAllMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#EBF0F0",
  padding: "8px 14px",
  borderRadius: "30px",
  width: "fit-content",
  cursor: "pointer",
}));

const SeeAllTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "700",
  color: "#000",
}));
