const person = {
  name: 'Asd',
  age: 26,
  location: {
    place: 'MYcity'
  }
};

//default value for name 
const {name = 'Anon', age} = person;
console.log(`${name} is ${age}`);

//default temp value and variable rename
const {place, temp: temperature = 12} = person.location;
console.log(`it is ${temperature} in ${place}`);

const book = {
  title:'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher : {
    name: 'Penguin' 
  }
};
const { name: publisherName = 'SelfPub' } = book.publisher
console.log(publisherName);


const address = ['1299 Street', 'Ramos Mejia', 'Buenos Aires', '1708'];
const [street, city, , zip] = address;
console.log(`${street}, ${city}, ${zip}`);