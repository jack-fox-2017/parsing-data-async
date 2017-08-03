"use strict"
let fs  = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this._Id = id
    this._First_name = first_name
    this._Last_name = last_name
    this._Email = email
    this._Phone =phone
    this._Created_at =created_at
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
  toStrings(){
    return `${this._Id}, ${this._First_name}, ${this._Last_name}, ${this._Email}, ${this._Phone}, ${this._Created_at}`
  }
}

class PersonParser {

  constructor(data) {
    this._data = fs.readFileSync(data,'utf8')
    this._people = this.readData() //ganti nih sama array of object, readData()
    this._file = data
    // this._arrdata =[];
  }

  readData(){
    var rawdata = this._data.trim().split('\r\n')
    var arrcontent= [];
    var result =[];
    for (var i = 1; i < rawdata.length; i++) {
      arrcontent.push(rawdata[i].split(','))
    }
    for (var i = 0; i < arrcontent.length; i++) {
      var personbaru = new Person(arrcontent[i][0],arrcontent[i][1],arrcontent[i][2],arrcontent[i][3],arrcontent[i][4],arrcontent[i][5])
      result.push(personbaru);
    }
    // return arrcontent
    // return result// return result // abis push, return. kalau langsung return push. hasilnya counting array aja
    return result
  }

  get people() {
    var people = {}
    people.size = this._people.length
    // return this._people
    return people
  }

  addPerson(personnew){
    this._people.push(personnew)
    // return this._people
    // console.log(this._people)
  }

  // convertString(){
  //   var add = this._people
  //   var convert = add.map(function(person) {
  //   return person.toStrings();
  //   });
  //   var result = convert.join('\n')
  //   return result
  // }
  save(){
    var add = this._people
    var convert = add.map(function(person) {
    return person.toStrings().join('\n');
    });

    console.log(convert);
    // var result = convert.join('\r\n')
    fs.writeFileSync(this._file, convert.toStrings(), 'utf8')
    // console.log(this._people);
    // fs.appendFileSync(this._file, this._people[this._people.length-1].toStrings() + '\n', 'utf8')
    // // return write
    // console.log('saved');
    // return result;
  }
}

let parser = new PersonParser('people (copy).csv')
let personbaru = new Person('202','Ogi','Ogi lagi','ogi@lagi.com','888-888-888',new Date().toISOString());

// console.log(parser.addPerson(personbaru));
parser.addPerson(personbaru);
// parser.addPerson(personbaru);
// console.log(parser.save());
// console.log(parser.people);
// console.log(parser.readData());
parser.save()
// console.log(parser._people);
// console.log(parser.save());
// parser.convertString();
// console.log(parser.save());


// console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
