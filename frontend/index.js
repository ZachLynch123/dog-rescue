// Dog class used to deconstruct JSON response
class Dog {
    constructor(id, name, age, gender, breed){
        this.id = id;
        this.name = name;
        this.age = age; 
        this.gender = gender;
        this.breed = breed;
    }
}
// variable to hold all dog objects for easy reference
let dogs = []

// GET request for API
fetch("http://127.0.0.1:3000/dogs")
    .then(res => {
        return res.json();
    })
    .then(json => {
        json.map((value,id) => {
            dogs[id] = new Dog(value.id, value.name, value.age, value.gender, value.breed);
        })
    });

function listDogs(dogs){
    const ul = document.querySelector('ul');
    console.log(ul);
    const li = document.createElement('li');
    li.appendChild(document.createTextNode("Hello from JS"));
    ul.appendChild(li)
    console.log('running');
}

listDogs(dogs);








