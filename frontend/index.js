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
const ul = document.querySelector('ul');
let list

// GET request for API
fetch("http://127.0.0.1:3000/dogs")
    .then(res => {
        return res.json();
    })
    .then(json => {
        json.map((value,id) => {
            dogs[id] = new Dog(value.id, value.name, value.age, value.gender, value.breed);
            const btn = document.createElement('button');
            btn.appendChild(document.createTextNode(`${dogs[id].name}`));
            ul.appendChild(btn);
        });
    })
    // gets all elements in list. can use to get onClickListeners for each one to get a "show" of all attributes of dog class
    .finally(() => {
        list = document.getElementsByTagName("button");
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener('click', e => {
                showDog(dogs[i]);
            });
        }
    });


function showDog(dog) {
    fetch(`http://127.0.0.1:3000/dogs/${dog.id}`)
    .then(res => {
        return res.json();
    })
    .then(json => {
        while (ul.hasChildNodes()) {
            ul.removeChild(ul.lastChild);
        }
    });
}

