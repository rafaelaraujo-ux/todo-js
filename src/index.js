import './styles.css';
import {Todo, TodoList} from './classes'; //Busca dentro de la carpeta "classes" el index por defecto
import {crearTodoHtml} from './js/componentes';

export const todoList = new TodoList();

// Los todos se reconstruyen en el html
// todoList.todos.forEach(todo => crearTodoHtml(todo));
// Modo abreviado cuando el argumento(todo) que se quiere enviar es el único argumento que mandan a otra función o método
todoList.todos.forEach(crearTodoHtml);

// const newTodo = new Todo('Aprender JavaScript');

// todoList.nuevoTodo(newTodo);

// todoList.todos[0].imprimirClase();

console.log('todos', todoList.todos);