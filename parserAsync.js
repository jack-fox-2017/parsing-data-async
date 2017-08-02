"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = {};
    this._arrPeople = [];
  }

  readData() {
    let readFile = fs.readFileSync(this._file).toString().trim().split('\n');
    let arr = [];
    let arrPeople = [];
    for (let i = 0; i < readFile.length; i++) {
      arr.push(readFile[i].split(','));
    }
    for (let i = 1; i < arr.length; i++) {
      let person = new Person(arr[i][0], arr[i][1], arr[i][2], arr[i][3], arr[i][4], arr[i][5]);
      this._arrPeople.push(person);
    }
    return this._arrPeople;
  }

  get people() {
    return this._people;
  }

  addPerson(input) {
    let date = new Date();
    this._newPerson = new Person(input[0],input[1],input[2],input[3],input[4],date.toISOString());
    this._arrPeople.push(this._newPerson);
  }

  save(){
    let newPerson = [];
    newPerson.push(['id','first_name','last_name','email','phone','created_at']);
    for(let i=0; i<this._arrPeople.length; i++){
      newPerson.push([this._arrPeople[i].id,this._arrPeople[i].first_name,this._arrPeople[i].last_name,this._arrPeople[i].email,this._arrPeople[i].phone,this._arrPeople[i].created_at]);
    }
    this._people = {size: this._arrPeople.length};
    fs.writeFileSync(this._file, newPerson.join('\n'));
    console.log('\nAll data(s) is saved!');
  }

  parserAsync(cb){
    fs.readFile(this._file, 'utf-8', (err, csvData) => {
      let csv = csvData.toString().split('\n');
      let arr = [];
      for(let i=0; i<csv.length; i++){
        arr.push(csv[i].split(','));
      }
      for(let i=1; i<arr.length-1; i++){
        this._arrPeople.push(new Person(arr[i][0], arr[i][1], arr[i][2], arr[i][3], arr[i][4], arr[i][5]));
      }
      cb(err, csvData);
    });
  }
}

console.log('-----BEGIN----\n')
let parser = new PersonParser('people.csv')
parser.parserAsync(function(){
  console.log(parser._arrPeople);
  parser.addPerson(['201', 'Ahmad', 'Aidil', 'ahmdaidil@gmail.com', '62-811-780-1961']);
  parser.save();
  console.log(`\nThere are ${parser.people.size} people in the file '${parser._file}'.`);
  console.log('\n------END------');
});
console.log('\n-----this line should after parserAsync------');
// without callback (before async)
// console.log(parser.readData());
// //parser.people;
// parser.addPerson(['201', 'Ahmad', 'Aidil', 'ahmdaidil@gmail.com', '62-811-780-1961']);
// //console.log(parser.people);
// parser.save();
// console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`);
