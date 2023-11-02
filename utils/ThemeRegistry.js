"use client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useServerInsertedHTML } from "next/navigation";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { changeThemeMode } from "@/redux/theme/themeSlice";

export default function ThemeRegistry(props) {
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const themeMode = useSelector((state) => state.theme.themeMode);

  const dispatch = useDispatch();

  const { options, children } = props;
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });
  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  function getActiveTheme(themeMode) {
    return themeMode === "light" ? lightTheme : darkTheme;
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      dispatch(changeThemeMode(theme));
      setActiveTheme(getActiveTheme(themeMode));
    } else {
      localStorage.setItem("theme", "light");
      dispatch(changeThemeMode("light"));
      setActiveTheme(getActiveTheme("light"));
    }
  }, [themeMode]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
