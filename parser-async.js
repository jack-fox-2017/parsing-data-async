"use strict"
let fs  = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this._Id = id
    this._First_name = first_name
    this._Last_name = last_name
    this._Email = email
    this._Phone = phone
    this._Created_at = created_at
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
  toStrings(){
    return `${this._Id}, ${this._First_name}, ${this._Last_name}, ${this._Email}, ${this._Phone}, ${this._Created_at}`
    // return this._id + ',' + this._firstName + ',' + this._lastName + ',' + this._email + ',' + this._phone + ',' + this._createdAt
  }
}

class PersonParser {

  constructor(data) {
    this._data = fs.readFileSync(data,'utf8')
    // this._people = this.readData() //ganti nih sama array of object, readData()
    // this._people = null
    this._people = null
    this._file = data
  }

  // readData(){
  //   var rawdata = this._data.trim().split('\r\n')
  //   var arrcontent= [];
  //   var result =[];
  //   for (var i = 1; i < rawdata.length; i++) {
  //     arrcontent.push(rawdata[i].split(','))
  //   }
  //   for (var i = 0; i < arrcontent.length; i++) {
  //     var personbaru = new Person(arrcontent[i][0],arrcontent[i][1],arrcontent[i][2],arrcontent[i][3],arrcontent[i][4],arrcontent[i][5])
  //     result.push(personbaru);
  //   }
  //   // return arrcontent
  //   // return result// return result // abis push, return. kalau langsung return push. hasilnya counting array aja
  //   // console.log(rawdata.length);
  //   return result
  // }

  readDataCallback(callback) {

    fs.readFile(this._file, `utf-8`, (err, data) => {

      let arrData = data.toString().trim().split('\r\n')
      let result = []
      for (var i = 1; i < arrData.length; i++) {
        let objvalue = arrData[i].split(',')
        result.push(new Person(objvalue[0],objvalue[1],objvalue[2],objvalue[3],objvalue[4],objvalue[5]))
      }
      this._people = result
      // return result
      // console.log(this._people);
      callback(err, data)
    });
  }


  addPerson(){
    let arrperson =[];
    let newnih = new Person('202','Ogi','Ogi lagi','ogi@lagi.com','888-888-888', new Date().toISOString());
    this._people.push(newnih)
    arrperson.push(['id','first_name','last_name','email','phone','created_at'])

    // (['id', 'first_name', 'last_name', 'email', 'phone', 'created_at'])

    for (var i = 0; i < this._people.length; i++) {
      arrperson.push(this._people[i].toString())
    }
    this.save(arrperson)
    // this.save(this._people)
  }

  save(arrpeople){
    fs.writeFile(this._file, this._people.join('\r\n'), (err)=>{
      if (err) throw err;
      return 'Added Person Saved'
    })
  }

  get people() {
    var people = {}
    people.size = this._people.length
    // return this._people
    return people
  }
}

let parser = new PersonParser('people.csv')
// let personbaru = new Person('202','Ogi','Ogi lagi','ogi@lagi.com','888-888-888', new Date().toISOString());
// console.log(parser.addPerson(personbaru));
// parser.addPerson(personbaru);
// console.log(parser.addPerson(personbaru));
// console.log(parser.save());
// console.log(parser.people);
// console.log(parser.readData());
// parser.save()
// console.log(parser._people);
// console.log(parser.save());
// parser.convertString();
// console.log(parser.save());


// console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
parser.readDataCallback(() => {
  parser.people;
  console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
  parser.addPerson();
  console.log(`After add there are ${parser.people.size} people in the file '${parser._file}'.`)
  console.log(parser.addPerson())

})
