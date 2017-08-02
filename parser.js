"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first, last, email, phone, createAt){
    this.id = id;
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.phone = phone;
    this.createAt = new Date(createAt);
  }
}

class PersonParser { // membaca dan menulis file

  constructor(file) {
    this._file = file; // csv nya masuk sini jadi this._file
    this._people = [];
  }

  get people() {
    var obj = {size: (this._people.length-1)}
    return obj;
  }

  addPerson(object) {
    this._people.push(object);


    this.save(object);
  }

  save(object) {
    let string = `${object.id},${object.firstName},${object.lastName},${object.email},${object.phone},${object.createAt.toISOString()}\n`;
    const fs = require('fs');
    fs.appendFile('people.csv', string, (err) => {
      // https://nodejs.org/api/fs.html#fs_fs_appendfile_file_data_options_callback
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
    });
  }



  parser(cb){
    var fs = require('fs');
    // var data = fs.readFileSync(this._file).toString().split('\n'); // "14,Latifah,Barron,est@mauris.edu,1-321-158-7603,2012-11-15T06:59:23-08:00",14,Latifah,Barron,est@mauris.edu,1-321-158-7603,2012-11-15T06:59:23-08:00
    fs.readFile(this._file, 'utf-8', (err, dataa) => {
      let data = dataa.toString().split('\n');
      let multiArray = [];
      for(let i = 0; i < data.length; i++)
      {
        multiArray.push(data[i].split(',')); // ["14","Latifah","Barron","est@mauris.edu","1-321-158-7603","2012-11-15T06:59:23-08:00"]
      }

      for(let i = 1; i < multiArray.length; i++)
      {
          let id = multiArray[i][0];
          let firstName = multiArray[i][1];
          let lastName = multiArray[i][2];
          let email = multiArray[i][3];
          let phone = multiArray[i][4];
          let createAt = multiArray[i][5]; // semuany mskin ke new array namany this.people
          this._people.push(new Person(id, firstName, lastName, email, phone, createAt));
      }

      cb();
    })


  }

}

let parser = new PersonParser('people.csv');
parser.parser(function(){
console.log(parser._people);
let date = new Date();
parser.addPerson(new Person('202', 'ahmad', 'nasikin', 'ahmad@gmail.com', '082312323', date));
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
});

// before callback
// let cek = parser.parser();
// let date = new Date();
// parser.addPerson(new Person('202', 'ahmad', 'nasikin', 'ahmad@gmail.com', '082312323', date));
// get people OR _people=> property
// console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
// console.log('----'+parser._people[0]);
