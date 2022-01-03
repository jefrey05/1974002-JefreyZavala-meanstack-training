const http = require("http");
const fs = require("fs");
const url = require("url");

const host = "localhost";
const port = 8000;

let tasksjs = [];

fs.readFile("./tasks.json", "utf8", (err, data) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
  } else {
    // parse JSON string to JSON object
    const tasks = JSON.parse(data);

    // print all databases
    tasks.forEach((task) => {
      tasksjs.push(task);
    });
  }
});

const requestListener = function (req, res) {
  //console.log("URL is:: ")
  //console.log(req.url);
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.write(
    `
            <h3>Add Task<h3>
            <form action="/add">
                <label for="empId">Employee ID:</label>
                <input type="text" id="empId" name="empId"><br><br>
                <label for="taskId">Task ID:</label>
                <input type="text" id="taskId" name="taskId"><br><br>
                <label for="task">Task:</label>
                <input type="text" id="task" name="task"><br><br>
                <label for="deadline">Deadline:</label>
                <input type="text" id="deadline" name="deadline"><br><br>
                <input type="submit" onclick="add()" value="Add">
            </form>
            <h3>Delete Task<h3>
            <form action="/delete">
                <label for="taskId">Task ID:</label>
                <input type="text" id="taskId" name="taskId"><br><br>
                <input type="submit" onclick="deleteTask()" value="Delete">
            </form>
            <h1>TASKS</h1>
            <script>
                function add(){
                    console.log(document.getElementById("tid").value);
                };

                function deleteTask(){
                    //console.log(document.getElementById("tid").value);
                };
                
            </script>
        `
  );
  let queryObject = url.parse(req.url, true).query;

  //console.log(queryObject);
  if (queryObject.empId) {
    //console.log(queryObject);
    tasksjs.push({
      empId: queryObject.empId,
      taskId: queryObject.taskId,
      task: queryObject.task,
      deadline: queryObject.deadline,
    });
    //console.log(tasksjs);
  }
  tasksjs.forEach((task) => {
    res.write(`
                <table><tr>
                <td>${task.taskId}</td> <td>${task.task} </td><td> ${task.empId} </td><td> ${task.deadline}</td>
                </tr></table>
                
            `);
  });
  fs.writeFile("tasks.json", JSON.stringify(tasksjs), function (err) {
    if (err) return console.log(err);
    //console.log('DONE');
  });

  if (!queryObject.empId && queryObject.taskId && !queryObject.task) {
    for (let i = 0; i < tasksjs.length; i++) {
      //console.log("TESTING:::")
      if (queryObject.taskId == tasksjs[i].taskId) {
        tasksjs.splice(i, 1);
        //console.log(tasksjs);
        break;
      }
    }
    //console.log(JSON.stringify(tasksjs))
  }

  /* fs.writeFile('tasks.json', JSON.stringify(tasksjs), function (err) {
        if (err) return console.log(err);
        console.log('DONE');
      }); */

  res.end();
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
