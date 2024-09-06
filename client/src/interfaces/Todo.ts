interface Todo {
  id?: BigInteger | null;
  text: string;
  priority: string;
  creationDate: string | null;
  done: boolean;
  dueDate: string | null;
  doneDate: string | null;
}
export default Todo;
