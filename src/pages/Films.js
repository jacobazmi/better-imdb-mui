import React, { useEffect, useState } from "react";
import FilmCard from "../components/Cards/FilmCard";
import { Grid } from "@mui/material";
import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const Films = () => {
  const [films, setFilms] = useState([]);
  // const appIp = "localhost";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const appIp = "localhost";

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

  return (
    <Container className="filmsPage">
      <Typography
        variant="h3"
        color="textSecondary"
        component="h2"
        sx={{ m: 1 }}
        gutterBottom
      >
        All Films
      </Typography>
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
              film={film}
              handleDelete={handleDelete}
              getFilms={getFilms}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Films;
