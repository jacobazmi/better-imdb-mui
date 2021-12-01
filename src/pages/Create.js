import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Alert,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";

const Create = () => {
  const [addFormData, setAddFormData] = useState({
    title: "",
    year: 0,
    description: "",
    length: 0,
    rating: "",
  });
  const appIp = "localhost";
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

  return (
    <Container>
      <Typography
        variant="h3"
        color="textSecondary"
        component="h2"
        sx={{ m: 1 }}
        gutterBottom
      >
        Add a film
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          name="title"
          label="Film Title"
          variant="outlined"
          sx={{ m: 1 }}
          // color="secondary"
          margin="dense"
          fullWidth
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
          sx={{ m: 1 }}
          fullWidth
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
    </Container>
  );
};

export default Create;