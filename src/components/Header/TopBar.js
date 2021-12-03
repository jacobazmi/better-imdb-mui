import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import { Paper, ThemeProvider } from "@mui/material";
import { appIp } from "../../App";

export default function TopBar() {
  const navigate = useNavigate();
  const [films, setFilms] = React.useState([]);

  React.useEffect(() => {
    fetch("http://" + appIp + ":8080/betterimdb/films")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((films) => {
        setFilms(films);
      });
  }, []);

  const menuId = "primary-search-account-menu";

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar elevation={20} position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => navigate("/")}
              >
                <HomeIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Better IMDB
              </Typography>
              <SearchIcon sx={{ ml: 2 }} />

              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={films.map((film) => film.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: 300 }}
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      "aria-label": "search",
                    }}
                    placeholder="Search…"
                  />
                )}
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => navigate("/create")}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
