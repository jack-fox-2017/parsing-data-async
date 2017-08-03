"use strict"
var csv = require("fast-csv");// wajib jika ingin pakai fast csv
const fs = require('fs');// wajib jika ingin pakai fast csv

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

}

class PersonParser
{

  constructor(file) {
    this._file = file
    this._people = null;
    this.readCallBack;
    this.readCallBackLength;
  }

  get people() {
    return this._people
  }

  addPerson(input)
  {
    fs.appendFile(this._file, input+"\n", err =>{
      if(err)
      {
        throw err;
      }
      else {
        console.log('saved');
      }
    })
  }

  read(callback){

    // var stream = fs.createReadStream(this._file);// wajib jika ingin pakai fast csv
    var data_people = []


    //----------------------------//
    var csvStream = csv
    .fromPath(this._file)
    .on("data", function(data){
      // console.log(data);
      data_people.push(data)
    })
    .on("end", function(){

      callback(data_people)
      console.log("done");
    });
    //----------------------------//

  }

  objArray()
  {
    this.read(function(data)// cara memanggil callback dari read(), karena kalau di panggil callback(data_people), itu tidak bisa
    {
      var pushObject = [];
      for(let i=1; i<data.length; i++)
        {
          var obj = {};
          for(let j=0; j<data[0].length; j++)
          {
            obj[data[0][j]] = data[i][j];
          }
          pushObject.push(obj);
          //console.log(pushObject);
        }
        console.log(pushObject);
      //console.log(data[0]);
    });
  }
}


let parser = new PersonParser('people.csv')

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// parser.read(function(data)// ini cara untuk memanggil nilai sebuah callback, dan bisa di masukan ke dalam method
//{
//   console.log(data);
// });

parser.objArray();
parser.addPerson('300,Mania,Juice,malesuada.fringilla@elitNullafacilisi.edu,1-702-580-4785,2012-02-22T10:09:03-08:00');
parser.objArray();
