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

function listDogs(dog){
    const btn = document.createElement('button');
    btn.appendChild(document.createTextNode(`${dog.name}`));
    ul.appendChild(btn);
}

function removeUlChildren(ul) {
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.lastChild);
    }
}

// makes another API call to the show endpoint, to show all the attributes for one dog
function showDog(dog) {
    fetch(`http://127.0.0.1:3000/dogs/${dog.id + 1}`)
    .then(res => {
        console.log(res.json);
        return res.json();
    })
    .then(json => {
        console.log(json);
        removeUlChildren(ul)
        const name = document.createElement('li');
        const age = document.createElement('li');
        const gender = document.createElement('li');
        const breed = document.createElement('li');

        name.appendChild(document.createTextNode(json.name));
        age.appendChild(document.createTextNode(json.age));
        gender.appendChild(document.createTextNode(json.gender));
        breed.appendChild(document.createTextNode(json.breed));
        
        ul.appendChild(name);
        ul.appendChild(age);
        ul.appendChild(gender);
        ul.appendChild(breed);
        
        const backButton = document.createElement('button');
        const adoptButton = document.createElement('button');
        backButton.appendChild(document.createTextNode('Back'));
        adoptButton.appendChild(document.createTextNode('Adopt'));
        ul.appendChild(backButton);
        ul.appendChild(adoptButton);
        backButton.addEventListener('click', e => {
            removeUlChildren(ul)
            for (let i = 0; i < dogs.length; i++) {
                listDogs(dogs[i]);
            }
            backButton.remove();
        });
        adoptButton.addEventListener('click', e => {
            fetch(`http://127.0.0.1:3000/dogs/${json.id}`,{
                method: 'DELETE',
            })
            .then(res => res.text())
            .then(res => {
                console.log(res);
                adoptButton.remove();
                removeUlChildren(ul)
                getAllDogs()
            });
        });

    });
}



// GET request for API
function getAllDogs(){
    fetch("http://127.0.0.1:3000/dogs")
    .then(res => {
        return res.json();
    })
    .then(json => {
        console.log(json);
        json.map((value,id) => {
            dogs[id] = new Dog(value.id, value.name, value.age, value.gender, value.breed);
            listDogs(dogs[id])
        });
    })
    // gets all elements in list. can use to get onClickListeners for each one to get a "show" of all attributes of dog class
    .finally(() => {
        const list = document.getElementsByTagName("button");
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener('click', e => {
                showDog(dogs[i]);
            });
        }
    });
}

getAllDogs()






























