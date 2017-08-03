"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(first_name, last_name, email, phone) {
    // this.id = this.getId()
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    // this.created_at = new Date()
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  parse(callback) {
    let fs = require('fs')
    fs.readFile(this._file, (err, data) => {
      if (err) throw err;
      // console.log(data);
      let data2 = data.toString().trim().split('\n')
      for (let i=1; i<data2.length; i++) {
        let obj = {}
        let key = data2[0].split(',')
        let value = data2[i].split(',')
        obj[key[0]] = value[0]
        obj[key[1]] = value[1]
        obj[key[2]] = value[2]
        obj[key[3]] = value[3]
        obj[key[4]] = value[4]
        obj[key[5]] = value[5]
        this._people.push(obj)
      }
      callback()
    });
  }

  get people() {
    let obj = {size: this._people.length}
    return obj
  }

  addPerson(objectPerson) {
    let fs = require('fs')
    fs.appendFile(this._file, `${this.getId()},${objectPerson.first_name},${objectPerson.last_name},${objectPerson.email}, ${objectPerson.phone},${new Date()}\n`, (err) => {
      if (err) throw err;
      console.log('Data was appended to file!');
    });
  }

  getId() {
    let fs = require('fs')
    let data = fs.readFileSync('people.csv', 'utf8').trim().split('\n')
    return data.length
    // console.log(data);
  }

}

let parser = new PersonParser('people.csv')


// parser.addPerson(new Person('Tri', 'Kbarek', 'irianto223@gmail.com', '082199142474'))
parser.parse(() => {
  console.log(parser._people);
  console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
});
