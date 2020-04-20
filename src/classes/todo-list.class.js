//Se crea una clase especializada para manejar todos lo referenta a la lista de to do

import { Todo } from "./todo.class";

export class TodoList {

    constructor () {

        //Almacenar todas las tareas pendientes en un arreglo
        // this.todos = [];
        this.cargarLocalStorage();
    }

    //Método agregar
    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    //Método eliminar
    eliminarTodo(id){
        //filter -> permite filtrar solo los elementos que deseamos y devuelve un nuevo array
        //recibe como argumento un id y la condición que se establece es regresar un nuevo arreglo excluyendo o filtrando el todo que coincida con ese id
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();

    }

    //Método marcar completado
    marcarCompletado(id){

        for(const todo of this.todos){

            if(todo.id == id){ //Valoracion == porque es string(todo.id) y number(id)

                todo.completado = !todo.completado; // el valor false pasa a ser true
                this.guardarLocalStorage();
                break; //Si se da la condición se sale del ciclo
            }
        }

    }

    //Método eliminar completados
    eliminarCompletados(){
        //La condición es devolver un nuevo array filtrando los elementos que no están completados
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    //JSON.stringify -> convierte en objeto abierto (representacion de un objeto) un arreglo ya que el localStorage almacena solo string
    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    //JSON.parse -> convierte un JSON string a su objeto original
    //.map -> El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo')) 
                      ? JSON.parse(localStorage.getItem('todo')) 
                      : [];

        //El map va a recibir un obj, que serán cada uno de los elementos que están en el arreglo todos, se pasa por una función de flecha, y retorna un new Todo con el fromJson. Va Todo en mayúscula porque es una propiedad estática.
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}