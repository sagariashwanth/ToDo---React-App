import React, { useState } from "react";
import "./Todo.css";
import { List, ListItem, ListItemText, Button, Modal } from "@material-ui/core";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo);

  const handleOpen = () => {
    setOpen(true);
  };
  //updating Todo with new input text
  const updateTodo = () => {
    db.collection("todos")
      .doc(props.todo.id)
      .set({ todo: input }, { merge: true }); //merge is something to say
    // that you are overriding the input already exists
    setOpen(false);
  };
  return (
    //  you give this brackets becoz you cant have two child i mean Modal and List without these
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Im a Modal</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button onClick={updateTodo}>Update Todo</button>
        </div>
      </Modal>
      <List className="todo_list">
        <ListItem>
          {/* this below line is for delete func, 1st todo is object and next represents the text. */}
          <ListItemText primary={props.todo.todo} secondary="todo" />
          {/* <ListItemText primary={props.text} secondary="todo" /> */}
        </ListItem>
        {/* Here inside button we do id becoz we need to delete particular item alone */}
        <button onClick={(e) => setOpen(true)}>EDIT</button>
        <DeleteForeverIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }>
          DELETE ME
        </DeleteForeverIcon>
        {/* <li>{props.text}</li> */}
      </List>
    </>
  );
}

export default Todo;
