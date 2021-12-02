import React, { useEffect, useState } from "react";
import FilmCard from "../components/Cards/FilmCard";
import { Grid } from "@mui/material";
import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { RadioGroup } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Paper, ThemeProvider } from "@mui/material";

const Films = () => {
  const [films, setFilms] = useState([]);
  // const appIp = "localhost";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const appIp = "localhost";
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("all");

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

  // const selectTerm = "action";

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

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <Container className="filmsPage">
      <ThemeProvider theme={theme}>
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
              <FormControlLabel
                value="drame"
                control={<Radio />}
                label="Drama"
              />
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
              <FormControlLabel
                value="games"
                control={<Radio />}
                label="Games"
              />
              <FormControlLabel
                value="horror"
                control={<Radio />}
                label="Horror"
              />
              <FormControlLabel
                value="music"
                control={<Radio />}
                label="Music"
              />
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
          {/* {loading ? <CircularProgress /> : <></>}
      {error ? (
        <Alert severity="error">This is an error alert — check it out!</Alert>
      ) : (
        <></>
      )} */}
          <Grid container spacing={3}>
            {films.map((film) => (
              <Grid item key={film.id} xs={6} md={6} lg={3}>
                <FilmCard
                  searchTerm={searchTerm}
                  film={film}
                  handleDelete={handleDelete}
                  getFilms={getFilms}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </ThemeProvider>
    </Container>
  );
};

export default Films;
