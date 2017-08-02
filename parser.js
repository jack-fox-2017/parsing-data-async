"use strict"

const fs = require('fs');


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(obj) {
    this._id = obj.id
    this._first_name = obj.first_name
    this._last_name = obj.last_name
    this._email = obj.email
    this._phone = obj.phone
    this._created_at = obj.hasOwnProperty('created_at') ? new Date(obj.created_at) : new Date()
  }

  write() {
    return `${this._id},${this._first_name},${this._last_name},${this._email},${this._phone},${this._created_at.toISOString()}`
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  start(callback) {
    fs.readFile(this._file, 'utf-8', (err, data) => {
      let file = data.trim().split('\r\n')
      let result = []
      for (let i = 1; i < file.length; i++) {
        let item = file[i].split(',')
        let obj = {
          id: item[0],
          first_name: item[1],
          last_name: item[2],
          email: item[3],
          phone: item[4],
          created_at: item[5]
        }
        result.push(new Person(obj))
      }
      this._people = result
      callback()
    })
  }

  get people() {
    return {arr: this._people, size: this._people.length}
  }

  addPerson(person) {
    this._people.push(person)
  }

  save() {
    let people = this._people.map(item => {return item.write()}).join('\r\n')
    // console.log(this._people);
    let data = 'id,first_name,last_name,email,phone,created_at\r\n'
    data += people
    fs.writeFileSync(this._file, data)
  }

}

var parser = new PersonParser('people.csv')
parser.start(() => {
  let rahmatObj = {
    id: 201,
    first_name: 'Rahmat',
    last_name: 'Hidayat',
    email: 'rahmatramahidayat@gmail.com',
    phone: '081334132495'
  }
  let rahmat = new Person(rahmatObj)

  console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
  parser.addPerson(rahmat)
  console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
  parser.save()

});
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
