// Dog class used fo deconstruction of JSON response
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

function listDogs(dogs){
    dogs.sort(function(a,b) {
        if (a.name < b.name) {return -1;}
        if (a.name > b.name) {return 1;}
        return 0;
    });
    for(let i = 0; i < dogs.length; i++) {
        const btn = document.createElement('button');
        btn.appendChild(document.createTextNode(`${dogs[i].name}`));
        ul.appendChild(btn);
    }
    
}

function removeUlChildren(ul) {
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.lastChild);
    }
}

// makes another API call to the show endpoint, to show all the attributes for one dog
function showDog(dog) {
    console.log(dog.id);
    fetch(`http://127.0.0.1:3000/dogs/${dog.id}`)
    .then(res => {
        return res.json();
    })
    .then(json => {
        console.log(json);
        const dogAttributes = json.data.attributes
        const colorAttribute = json.included[0].attributes
        // removes previous listed buttons
        removeUlChildren(ul)

        // assigns list elements to ul of dog attributes 
        const name = document.createElement('li');
        const age = document.createElement('li');
        const gender = document.createElement('li');
        const breed = document.createElement('li');
        const color = document.createElement('li');


        name.appendChild(document.createTextNode("name: " + dogAttributes.name));
        age.appendChild(document.createTextNode("age: " + dogAttributes.age));
        gender.appendChild(document.createTextNode("gender: " + dogAttributes.gender));
        breed.appendChild(document.createTextNode("breed: " + dogAttributes.breed));
        color.appendChild(document.createTextNode("color: " + colorAttribute.color))
        
        ul.appendChild(name);
        ul.appendChild(age);
        ul.appendChild(gender);
        ul.appendChild(breed);
        ul.appendChild(color)
        
        // create buttons to go back to main screen or adopt dog (delete dog from db)
        const backButton = document.createElement('button');
        const adoptButton = document.createElement('button');
        backButton.appendChild(document.createTextNode('Back'));
        adoptButton.appendChild(document.createTextNode('Adopt'));
        ul.appendChild(backButton);
        ul.appendChild(adoptButton);
        backButton.addEventListener('click', e => {
            removeUlChildren(ul)
            getAllDogs()
            backButton.remove();
        });
        adoptButton.addEventListener('click', e => {
            console.log(json);
            fetch(`http://127.0.0.1:3000/dogs/${json.data.id}`,{
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



// GET request for all dogs API endpoint
function getAllDogs(){
    fetch("http://127.0.0.1:3000/dogs")
    .then(res => {
        return res.json();
    })
    .then(json => {
        json.map((value,id) => {
            dogs[id] = new Dog(value.id, value.name, value.age, value.gender, value.breed);
        })
    }).then(() => {
        listDogs(dogs)
    })
    // adds onclick listener to each dog button and calls the show dog function
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






























