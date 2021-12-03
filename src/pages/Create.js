import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { createTheme } from "@mui/material/styles";
import { Paper, ThemeProvider } from "@mui/material";
import { appIp } from "../App";

const Create = () => {
  const [addFormData, setAddFormData] = useState({
    title: "",
    year: 0,
    description: "",
    length: 0,
    rating: "",
  });
  // const appIp = "localhost";
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const newFilm = {
      title: addFormData.title,
      year: addFormData.year,
      description: addFormData.description,
      length: addFormData.length,
      rating: addFormData.rating,
    };

    fetch("http://" + appIp + ":8080/betterimdb/films/addfilmbody", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFilm),
    }).then((response) => {
      if (response.ok) {
        setFailed(false);
        setSuccess(true);
        console.log("New film added");
      } else {
        setFailed(true);
        setSuccess(false);
      }
    });
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <Container className="createContainer">
      <ThemeProvider theme={theme}>
        <Paper elevation={4}>
          <Typography
            variant="h3"
            color="textSecondary"
            component="h2"
            sx={{ m: 1, p: 3, pb: 0 }}
            gutterBottom
          >
            Add a Film
          </Typography>

          <Box
            className="createBox"
            component="form"
            noValidate
            autoComplete="off"
            sx={{ p: 3 }}
          >
            <TextField
              name="title"
              className="text1"
              label="Film Title"
              variant="outlined"
              margin="dense"
              fullWidth
              sx={{ m: 1 }}
              required
              onChange={handleAddFormChange}
            ></TextField>
            <TextField
              name="year"
              label="Release Year"
              variant="outlined"
              type="number"
              sx={{ m: 1, width: "25ch" }}
              // color="secondary"
              margin="dense"
              required
              onChange={handleAddFormChange}
            ></TextField>
            <TextField
              name="length"
              label="Runtime"
              variant="outlined"
              type="number"
              sx={{ m: 1, width: "25ch" }}
              // color="secondary"
              margin="dense"
              onChange={handleAddFormChange}
            ></TextField>
            <TextField
              name="rating"
              label="Rating"
              variant="outlined"
              sx={{ m: 1, width: "25ch" }}
              // color="secondary"
              margin="dense"
              onChange={handleAddFormChange}
            ></TextField>
            {/* <TextField
          variant="outlined"
          color="secondary"
          margin="dense"
          sx={{ m: 1, width: "25ch" }}
          select
          label="Content Rating"
        >
          <MenuItem name="rating" value="PG" onClick={handleAddFormChange}>
            Ten
          </MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField> */}
            <TextField
              name="description"
              label="Description"
              multiline
              fullWidth
              sx={{ m: 1 }}
              rows={2}
              onChange={handleAddFormChange}
            ></TextField>
            <Button
              onClick={handleAddFormSubmit}
              type="submit"
              sx={{ m: 1 }}
              // color="secondary"
              variant="contained"
              endIcon={<KeyboardArrowRight />}
            >
              Submit
            </Button>
            {success ? (
              <Alert severity="success" sx={{ m: 1 }}>
                Film added!
              </Alert>
            ) : (
              <></>
            )}
            {failed ? (
              <Alert severity="warning" sx={{ m: 1 }}>
                Film not added!
              </Alert>
            ) : (
              <></>
            )}
          </Box>
        </Paper>
      </ThemeProvider>
    </Container>
  );
};

export default Create;
