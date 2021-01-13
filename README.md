## Getting started

1. Install Node.js: You need to have npm installed in your computer. It comes with Node.js and you can get it by installing Node from https://nodejs.org/en/

2. You should be able to execute the todo app by running the following command from the terminal.

   **On Windows:**

   ```
   .\todo.bat
   ```

   **On Unix:**

   ```
   ./todo.sh
   ```

## Specification

1. The app can be run in the console with `./todo.sh.sh`.

2. The app reads from and write to a `todo.txt` text file. Each todo item occupies a single line in this file.

3.  When a todo item is completed, it gets removed from `todo.txt` and instead added to the `done.txt` text file. This file has a different format:

    ```txt
    x 2020-06-12 the text contents of the todo item
    ```

    1. the current date in `yyyy-mm-dd` format
    2. the original text

    The date when the todo is marked as completed is recorded in the `yyyy-mm-dd` format (ISO 8601). For example, a date like `15th August, 2020` is represented as `2020-08-15`.

## Usage

### 1. Help

Executing the command without any arguments, or with a single argument `help` prints the CLI usage.

```
$ ./todo.sh help
Usage :-
$ ./todo.sh add "todo item"  # Add a new todo
$ ./todo.sh ls               # Show remaining todos
$ ./todo.sh del NUMBER       # Delete a todo
$ ./todo.sh done NUMBER      # Complete a todo
$ ./todo.sh help             # Show usage
$ ./todo.sh report           # Statistics
```

### 2. List all pending todos

Use the `ls` command to see all the todos that are not yet complete. The most recently added todo should be displayed first.

```
$ ./todo.sh ls
2. change light bulb
1. water the plants
```

### 3. Add a new todo

Use the `add` command. The text of the todo item should be enclosed within double quotes (otherwise only the first word is considered as the todo text, and the remaining words are treated as different arguments).

```
$ ./todo.sh add "the thing i need to do"
Added todo: "the thing i need to do"
```

### 4. Delete a todo item

Use the `del` command to remove a todo item by its number.

```
$ ./todo.sh del 3
Deleted todo #3
```

Attempting to delete a non-existent todo item should display an error message.

```
$ ./todo.sh del 5
Error: todo #5 does not exist. Nothing deleted.
```

### 5. Mark a todo item as completed

Use the `done` command to mark a todo item as completed by its number.

```
$ ./todo.sh done 1
Marked todo #1 as done.
```

Attempting to mark a non-existed todo item as completed will display an error message.

```
$ ./todo.sh done 5
Error: todo #5 does not exist.
```

### 6. Generate a report

Use the `report` command to see the latest tally of pending and completed todos.

```
$ ./todo.sh report
yyyy-mm-dd Pending : 1 Completed : 4
```