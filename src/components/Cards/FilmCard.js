import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { IconButton, Typography } from "@mui/material";
import { DeleteOutlined, MoreVert } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FilmCard = ({ film, handleDelete, getFilms }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <EditButton getFilms={getFilms} film={film} />
      <DeleteButton handleDelete={handleDelete} film={film} />
    </Menu>
  );

  return (
    <div>
      <Card elevation={11}>
        <CardHeader
          titleTypographyProps={{ variant: "h6" }}
          action={
            <IconButton
              aria-label="settings"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <MoreVert />
            </IconButton>
          }
          title={film.title}
          subheader={
            film.year + "  •  " + film.length + " mins" + "  •  " + film.rating
          }
        />
        <CardActions>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{film.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
      {renderMenu}
    </div>
  );
};

export default FilmCard;
