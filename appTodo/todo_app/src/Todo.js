import React from "react";
import "./Todo.css";
import { List, ListItem, ListItemText, Button } from "@material-ui/core";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function Todo(props) {
  return (
    <List className="todo_list">
      <ListItem>
        {/* this below line is for delete func, 1st todo is object and next represents the text. */}
        <ListItemText primary={props.todo.todo} secondary="todo" />
        {/* <ListItemText primary={props.text} secondary="todo" /> */}
      </ListItem>
      {/* Here inside button we do id becoz we need to delete particular item alone */}
      <DeleteForeverIcon
        onClick={(event) => db.collection("todos").doc(props.todo.id).delete()}
      >
        DELETE ME
      </DeleteForeverIcon>
      {/* <li>{props.text}</li> */}
    </List>
  );
}

export default Todo;
