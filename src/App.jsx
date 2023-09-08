import React, { useState, useRef } from "react";
import "./App.css";
import jsPDF from "jspdf";

const App = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const pdfRef = useRef();

  const addTask = () => {
    if (task.trim() === "" || desc.trim() === "") {
      // Check if either the task or description is empty
      alert("Please enter both a task and a description.");
    } else {
      setMainTask([...mainTask, { task, desc }]);
      setTask("");
      setDesc("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks.splice(index, 1);
    setMainTask(updatedTasks);
  };



  const downloadTasks = () => {
    const doc = new jsPDF();

    mainTask.forEach((t, index) => {
      doc.text(`${index + 1}. Task: ${t.task}`, 10, 10 + index * 20);
      doc.text(`   Description: ${t.desc}`, 10, 20 + index * 20);
    });

    doc.save("tasklist.pdf");
  };

  let renderTask = <h2 className="renderhead">NO TASKS ADDED</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <div className="tasksection" key={i}>
        <button className="delete-button" onClick={() => deleteTask(i)}>
          X
        </button>
          <ol>
            <li className="task-number">{i + 1}.</li>
            <li>
              <h3 className="task">TASK: {t.task}</h3>
            </li>
            <li>
              <h3 className="taskdesc">DESCRIPTION: {t.desc}</h3>
            </li>
          </ol>
        </div>
      );
    });
  }
  var flag = 0;

const darkmode = () => {
  if (flag === 0) {
    // Dark Mode
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";

    // Change task section text color to a cool color (e.g., teal)
    const taskSections = document.querySelectorAll(".tasksection");
    taskSections.forEach((section) => {
      section.style.color = "black";
    });

    flag = 1;
  } else {
    // Light Mode
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";

    // Reset task section text color
    const taskSections = document.querySelectorAll(".tasksection");
    taskSections.forEach((section) => {
      section.style.color = ""; // Reset to default color
    });

    flag = 0;
  }
};

  

  return (
    <>
      <div className="navbar">
        <h1>TO-DO LIST</h1>
        <button className="dark" onClick={darkmode}>
          DARK MODE
        </button>
        <button className="btn" onClick={downloadTasks}>
          DOWNLOAD TASKS
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Your Task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></input>
        <button className="addtasks" onClick={addTask}>
          {" "}
          ADD TASK{" "}
        </button>
      </div>
      <hr></hr>
      <div className="sec1">
        <ol>{renderTask}</ol>
      </div>
    </>
  );
};

export default App;
