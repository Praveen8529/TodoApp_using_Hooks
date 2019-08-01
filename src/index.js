import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import uuid from "uuid";

const intialData = [
  {
    id: uuid(),
    Task: "Learn React",
    complete: true
  },
  {
    id: uuid(),
    Task: "Learn Redux",
    complete: true
  },
  {
    id: uuid(),
    Task: "Learn WebPack",
    complete: false
  }
];
const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_COMPLETE":
      return "COMPLETE";
    case "SHOW_INCOMPLETE":
      return "INCOMPLETE";
    default:
      throw new Error();
  }
};

function App() {
  const [task, setTask] = useState("");
  const [form, setForm] = useState(intialData);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

  const handelChangeInput = e => {
    setTask(e.target.value);
  };
  const HandelSubmit = e => {
    if (task) {
      setForm(
        form.concat({
          id: uuid(),
          Task: task,
          complete: false
        })
      );
    }
    setTask("");
    e.preventDefault();
  };
  const forms = form.filter(todo => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }

    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }
    return false;
  });
  const HandelChangeStatus = e => {
    var newTask = form.filter(x => x.id === e.target.id);
    newTask.complete = !newTask.complete;
    // console.log(newTask);
    setForm(
      form.map(x => {
        if (x.id === e.target.id) {
          return { ...x, complete: !x.complete };
        } else {
          return { ...x };
        }
      })
    );
  };
  const handleShowComplete = () => {
    dispatchFilter({ type: "SHOW_COMPLETE" });
  };
  const handleShowIncomplete = () => {
    dispatchFilter({ type: "SHOW_INCOMPLETE" });
  };
  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  return (
    <div className="">
      <div>
        <button type="button" onClick={handleShowAll}>
          Show All
        </button>
        <button type="button" onClick={handleShowComplete}>
          Show Complete
        </button>
        <button type="button" onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>
      <ul>
        {forms.map(x => (
          <li
            style={{ textDecorationLine: x.complete ? "line-through" : "none" }}
            id={x.id}
            onClick={HandelChangeStatus}
          >
            {x.Task}
          </li>
        ))}
      </ul>
      <form onClick={HandelSubmit}>
        Please Enter Task{" "}
        <input type="text" value={task} onChange={handelChangeInput} />
        <button>Submit</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
