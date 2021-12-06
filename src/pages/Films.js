import React, { useEffect, useState } from "react";
import FilmCard from "../components/Cards/FilmCard";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { appIp } from "../App";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchBar from "../components/SearchBar";

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://" + appIp + ":8080/betterimdb/films")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((films) => {
        setFilms(films);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ m: "auto" }} />;
  if (error) return <Alert severity="error">Could not fetch!</Alert>;

  const getFilms = () => {
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
  };

  const handleDelete = async (id) => {
    fetch("http://" + appIp + ":8080/betterimdb/films/deletefilm/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("Film " + resp.id + " deleted.", resp);
        getFilms();
      });
    });
  };

  const handleGenreSelect = (selectTerm) => {
    setGenre(selectTerm);
    if (selectTerm === "all") {
      getFilms();
    } else {
      fetch(
        "http://" +
          appIp +
          ":8080/betterimdb/films" +
          "/search/genres/?genre.name=" +
          selectTerm
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((films) => {
          setFilms(films);
        });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchFilms = (e) => {
    e.preventDefault();
    let newApiUrl =
      "http://" +
      appIp +
      ":8080/betterimdb/films" +
      "/search?title=" +
      searchTerm;
    console.log(newApiUrl);
    fetch(newApiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((films) => {
        setFilms(films);
        setGenre("all");
      });
  };

  // const theme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });

  return (
    <Container className="filmsPage">
      {/* <ThemeProvider theme={theme}> */}
      <Paper elevation={4} sx={{ p: 2 }}>
        <Typography
          variant="h3"
          color="textSecondary"
          component="h2"
          sx={{ m: 1 }}
          gutterBottom
        >
          Films
        </Typography>
        <div>
          <SearchBar searchFilms={searchFilms} handleSearch={handleSearch} />
        </div>
        <div>
          <RadioGroup
            sx={{ m: 1 }}
            row
            value={genre}
            onChange={(e) => handleGenreSelect(e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="animation"
              control={<Radio />}
              label="Animation"
            />
            <FormControlLabel
              value="children"
              control={<Radio />}
              label="Children"
            />
            <FormControlLabel
              value="classics"
              control={<Radio />}
              label="Classics"
            />
            <FormControlLabel
              value="comedy"
              control={<Radio />}
              label="Comedy"
            />
            <FormControlLabel
              value="documentary"
              control={<Radio />}
              label="Documentary"
            />
            <FormControlLabel value="drame" control={<Radio />} label="Drama" />
            <FormControlLabel
              value="family"
              control={<Radio />}
              label="Family"
            />
            <FormControlLabel
              value="foreign"
              control={<Radio />}
              label="Foreign"
            />
            <FormControlLabel value="games" control={<Radio />} label="Games" />
            <FormControlLabel
              value="horror"
              control={<Radio />}
              label="Horror"
            />
            <FormControlLabel value="music" control={<Radio />} label="Music" />
            <FormControlLabel value="new" control={<Radio />} label="New" />
            <FormControlLabel
              value="sci-fi"
              control={<Radio />}
              label="Sci-Fi"
            />
            <FormControlLabel
              value="sports"
              control={<Radio />}
              label="Sports"
            />
            <FormControlLabel
              value="travel"
              control={<Radio />}
              label="Travel"
            />
          </RadioGroup>
        </div>
        <Grid container spacing={3}>
          {films.map((film) => (
            <Grid item key={film.id} xs={6} md={6} lg={3}>
              <FilmCard
                film={film}
                handleDelete={handleDelete}
                getFilms={getFilms}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
      {/* </ThemeProvider> */}
    </Container>
  );
};

export default Films;
