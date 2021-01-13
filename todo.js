const fs = require('fs');

const args = process.argv;
const currentWorkingDirectory = args[1].slice(0, -7);

if (fs.existsSync(currentWorkingDirectory + 'todo.txt') === false) {
  let createStream = fs.createWriteStream('todo.txt');
  createStream.end();
}
if (fs.existsSync(currentWorkingDirectory + 'done.txt') === false) {
  let createStream = fs.createWriteStream('done.txt');
  createStream.end();
}

const InfoFunction = () => {
  const UsageText = `
Usage :-
$ ./todo.sh add "todo item"  # Add a new todo
$ ./todo.sh ls               # Show remaining todos
$ ./todo.sh del NUMBER       # Delete a todo
$ ./todo.sh done NUMBER      # Complete a todo
$ ./todo.sh help             # Show usage
$ ./todo.sh report           # Statistics`;

  console.log(UsageText);
};

const listFunction = () => {
  let data = [];
  const fileData = fs
    .readFileSync(currentWorkingDirectory + 'todo.txt')
    .toString();
  data = fileData.split('\n');
  let filterData = data.filter(function (value) {
    return value !== '';
  });

  if (filterData.length === 0) {
    console.log('There are no pending todos!');
  }
  for (let i = 0; i < filterData.length; i++) {
    console.log((filterData.length - i) + '. ' + filterData[i]);
  }
};

const addFunction = () => {
  const newTask = args[3];
  if (newTask) {
    let data = [];

    const fileData = fs
      .readFileSync(currentWorkingDirectory + 'todo.txt')
      .toString();

    fs.writeFile(
      currentWorkingDirectory + 'todo.txt',
      newTask + '\n' + fileData,
      function (err) {
        if (err) throw err;
        console.log('Added todo: "' + newTask + '"');
      },
    );
  } else {
    console.log('Error: Missing todo string. Nothing added!');
  }
};

const deleteFunction = () => {
  const deleteIndex = args[3];
  if (deleteIndex) {
    let data = [];
    const fileData = fs
      .readFileSync(currentWorkingDirectory + 'todo.txt')
      .toString();
    data = fileData.split('\n');
    let filterData = data.filter(function (value) {
      return value !== '';
    });
    if (deleteIndex > filterData.length || deleteIndex <= 0) {
      console.log(
        'Error: todo #' + deleteIndex + ' does not exist. Nothing deleted.',
      );
    } else {
      filterData.splice(filterData.length - deleteIndex, 1);
      const newData = filterData.join('\n');
      fs.writeFile(
        currentWorkingDirectory + 'todo.txt',
        newData,
        function (err) {
          if (err) throw err;
          console.log('Deleted todo #' + deleteIndex);
        },
      );
    }
  } else {
    console.log('Error: Missing NUMBER for deleting todo.');
  }
};

const doneFunction = () => {
  const doneIndex = args[3];
  if (doneIndex) {
    let data = [];
    let dateobj = new Date();
    let dateString = dateobj.toISOString().substring(0, 10);
    const fileData = fs
      .readFileSync(currentWorkingDirectory + 'todo.txt')
      .toString();
    const doneData = fs
      .readFileSync(currentWorkingDirectory + 'done.txt')
      .toString();
    data = fileData.split('\n');
    let filterData = data.filter(function (value) {
      return value !== '';
    });
    if (doneIndex > filterData.length || doneIndex <= 0) {
      console.log('Error: todo #' + doneIndex + ' does not exist.');
    } else {
      const deleted = filterData.splice(filterData.length - doneIndex, 1);
      const newData = filterData.join('\n');
      fs.writeFile(
        currentWorkingDirectory + 'todo.txt',
        newData,
        function (err) {
          if (err) throw err;
        },
      );
      fs.writeFile(
        currentWorkingDirectory + 'done.txt',
        dateString + ' ' + deleted + '\n' + doneData,
        function (err) {
          if (err) throw err;
          console.log('Marked todo #' + doneIndex + ' as done.');
        },
      );
    }
  } else {
    console.log('Error: Missing NUMBER for marking todo as done.');
  }
};

const reportFunction = () => {
  let todoData = [];
  let doneData = [];
  let dateobj = new Date();
  let dateString = dateobj.toISOString().substring(0, 10);
  const todo = fs.readFileSync(currentWorkingDirectory + 'todo.txt').toString();
  const done = fs.readFileSync(currentWorkingDirectory + 'done.txt').toString();
  todoData = todo.split('\n');
  doneData = done.split('\n');
  let filterTodoData = todoData.filter(function (value) {
    return value !== '';
  });
  let filterDoneData = doneData.filter(function (value) {
    return value !== '';
  });
  console.log(
    dateString +
      ' ' +
      'Pending : ' +
      filterTodoData.length +
      ' Completed : ' +
      filterDoneData.length,
  );
};

switch (args[2]) {
  case 'add': {
    addFunction();
    break;
  }

  case 'ls': {
    listFunction();
    break;
  }
  case 'del': {
    deleteFunction();
    break;
  }
  case 'done': {
    doneFunction();
    break;
  }
  case 'help': {
    InfoFunction();
    break;
  }
  case 'report': {
    reportFunction();
    break;
  }
  default: {
    InfoFunction();
  }
}