"use strict"

// add library fs untuk membaca file
const fs = require('fs');

class Person {

  // Menambahkan attributes [erson]
  constructor(id, firstName, lastName, email, phone, created_at) {
    this._id = id
    this._firstName = firstName
    this._lastName = lastName
    this._email = email
    this._phone = phone
    this._createdAt = created_at
  }

  toString() {
    return this._id + ',' + this._firstName + ',' + this._lastName + ',' + this._email + ',' + this._phone + ',' + this._createdAt
  }
}

class PersonParser {

  constructor(file, firstName, lastName, email, phone) {
    // super(' ',firstName,lastName,email,phone)
    this._file = file
    this._people = null
  }

  startReadFile(callback) {
    fs.readFile(this._file, `utf-8`, (err, data) => {
      let dataFile = data.trim().split('\n')
      let result = []
      for (var i = 1; i < dataFile.length; i++) {
        let arr = dataFile[i].split(',')
        result.push(new Person(
          arr[0],
          arr[1],
          arr[2],
          arr[3],
          arr[4],
          arr[5]
        ))
      }
      this._people = result
      //console.log(this._people);
      callback()
    }
    )
  }

  get people() {
    return { arr: this._people, size: this._people.length }
  }

  addPerson() {
    var today = new Date()
    var add = new Person(this._people.length+1, 'achim', 'baggins', 'achim_baggins@yahoo.com', '0818-0370-4343', today.toISOString())
    var arrNewPeople = []

    this._people.push(add)
    arrNewPeople.push(['id', 'first_name', 'last_name', 'email', 'phone', 'created_at'])

    // push data kedalam temporarry array
    for (let j = 0; j < this._people.length; j++) {
      arrNewPeople.push(this._people[j].toString())
    }
    //console.log(arrNewPeople);
    this.writeFile(arrNewPeople)
  }

  writeFile(arr) {
    // add data kedalam CSV
    fs.writeFile(this._file, arr.join("\n"), function (err) {
      if (err) throw err;
      return 'New People Added!';
    });
  }

}

let parser = new PersonParser('people.csv')
parser.startReadFile(() => {
  parser.people;
  console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
  parser.addPerson();
  console.log(`After add there are ${parser.people.size} people in the file '${parser._file}'.`)
})
