/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  #tasks;
  constructor() {
    this.#tasks = new Array();
  }
  isValidIndex(index) {
    if (index < 0 || index >= this.#tasks.length) {
      return false;
    }
    return true;
  }
  add(task) {
    this.#tasks.push(task);
  }
  remove(index) {
    if (this.isValidIndex(index)) {
      this.#tasks.splice(index, 1);
    }
  }
  update(index, updatedTask) {
    if (this.isValidIndex(index)) {
      this.#tasks[index] = updatedTask;
    }
  }
  getAll() {
    return this.#tasks;
  }
  get(index) {
    if (!this.isValidIndex(index)) return null;
    return this.#tasks[index];
  }
  clear() {
    this.#tasks = [];
  }
}

module.exports = Todo;
