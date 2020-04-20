

//export -> cuando se utiliza esta clase fuera de este archivo
export class Todo{

    //Para pasar de objetos a instancias, mediante un método estático
    static fromJson({id,tarea,completado,creado}){

        const tempTodo = new Todo(tarea);

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;
    }


    constructor(tarea){

        this.tarea      = tarea;

        //Cada vez que se crea una tarea realiza lo siguiente:
        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }


    imprimirClase(){

        console.log(`${this.tarea} - ${this.id}`);
    }
}