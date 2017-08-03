"use strict"
let fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.create_at = new Date().toISOString();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parser();
  }

  parser() {
    //let list = fs.readFileSync('people.csv','utf8').trim().split('\n');
    function readData(file, cb){
      fs.readFile(file,'utf8', (err, data) => {
        cb(data, err, 'people.csv')
      })
    }

    readData('people.csv', function(data, err, namaFile){
      console.log(data.length);
    })

    let data = [];
    let arrObj = [];
    for (var j = 1; j < data.length; j++) {
      data.push(list[j].split(','))
    }
    for (var i = 0; i < data.length; i++) {
      arrObj[i] = new Person(data[i][0], data[i][1], data[i][2],data[i][3], data[i][4], data[i][5])
    }
    return data;
    //console.log(arrObj);
  }
  get people() {
    let people ={}
    people.size = this._people.length;
    return people
  }

  addPerson(Obj) {
    this._people.push(new Person(Obj));
    console.log(this._people);
    let ObjBaru = Obj;
    console.log(ObjBaru);
    this.string = `${ObjBaru.id}, ${ObjBaru.first_name}, ${ObjBaru.last_name}, ${ObjBaru.email}, ${ObjBaru.phone}, ${ObjBaru.create_at}`
    var newData = this.string
    //console.log(newData);
    //fs.appendFileSync(this._file, this.string + '\n') //menambah saja bukan di rewrite
    function writeData(file, cb){
      fs.writeFile('people.csv', newData+'\n', (err) => {
        if (err) throw err;
        console.log('The Files has been saved!');
      })
    }
    writeData('people.csv', function(newData, err, namaFile){
      console.log(newData.length);
    })
    return ObjBaru
  }

}

let parser = new PersonParser('people.csv')
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
parser.addPerson(new Person('201','Anggiey','Laras','syalalagonjreng@mail.com','0274-587653'));
