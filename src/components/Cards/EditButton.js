import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, TextField } from "@mui/material";

export default function EditButton({ film, getFilms }) {
  const [open, setOpen] = React.useState(false);

  const [editFilmId, setEditFilmId] = React.useState(null);
  const appIp = "localhost";

  const [editFormData, setEditFormData] = React.useState({
    title: "",
    year: 0,
    description: "",
    length: 0,
    rating: "",
  });

  const handleEditClick = (film) => {
    setEditFilmId(film.id);

    const formValues = {
      title: film.title,
      year: film.year,
      description: film.description,
      length: film.length,
      rating: film.rating,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditFilmId(null);
    setEditFormData({
      title: "",
      year: 0,
      description: "",
      length: 0,
      rating: "",
    });
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const updateFilm = () => {
    const editedFilm = {
      id: editFilmId,
      title: editFormData.title,
      year: editFormData.year,
      description: editFormData.description,
      length: editFormData.length,
      rating: editFormData.rating,
    };

    const index = editFilmId;

    fetch(
      "http://" + appIp + ":8080/betterimdb/films/updatefilmbody/" + index,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedFilm),
      }
    ).then((result) => {
      result.json().then((resp) => {
        console.warn("Film " + resp.id + " updated.", resp);
      });
    });
    alert("Film updated: ID " + index);
    setEditFilmId(null);
    getFilms();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem
        variant="outlined"
        onClick={() => {
          handleEditClick(film);
          handleClickOpen();
        }}
      >
        Edit
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Film"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Editing film " +
              '"' +
              film.title +
              '"' +
              " (ID: " +
              film.id +
              ")"}
          </DialogContentText>
          <TextField
            name="title"
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            defaultValue={film.title}
            onChange={handleEditFormChange}
          ></TextField>
          <TextField
            name="year"
            autoFocus
            margin="dense"
            label="Year"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={film.year}
            onChange={handleEditFormChange}
          ></TextField>
          <TextField
            name="rating"
            autoFocus
            margin="dense"
            label="Rating"
            fullWidth
            variant="standard"
            defaultValue={film.rating}
            onChange={handleEditFormChange}
          ></TextField>
          <TextField
            name="length"
            autoFocus
            margin="dense"
            label="Length"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={film.length}
            onChange={handleEditFormChange}
          ></TextField>
          <TextField
            name="description"
            autoFocus
            margin="dense"
            label="Description"
            multiline
            rows={2}
            fullWidth
            variant="standard"
            defaultValue={film.description}
            onChange={handleEditFormChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              handleCancelClick();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              updateFilm();
              handleClose();
            }}
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
