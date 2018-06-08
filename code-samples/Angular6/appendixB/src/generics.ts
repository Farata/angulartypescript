class Person {
    name: string;
}

class Employeee extends Person{
    department: number;
}

class Animal {
  //  name: string;
    breed: string;
}

let myWorkers: Array<Person> = [ ];

myWorkers[0] = new Person();
myWorkers[1] = new Employeee();
//myWorkers[2] = new Animal();
