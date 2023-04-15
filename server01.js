const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const hbs = require('express-handlebars');
const path = require('path');
const { Console } = require("console");
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: "views/partials",
}));
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów

app.use(express.static('static'));


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})


app.get("/", function (req, res) {
    res.render('index.hbs');
})

app.get("/addCar", function (req, res) {
    res.render('addCar.hbs');   // nie podajemy ścieżki tylko nazwę pliku
})

const Datastore = require('nedb')


const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});

app.get("/insertCar", function (req, res) {
    data = req.query;
    let obj = {
        ubezpieczony: data.ubezpieczony == "tak" ? "TAK" : "NIE",
        benzyna: data.benzyna == "tak" ? "TAK" : "NIE",
        uszkodzony: data.uszkodzony == "tak" ? "TAK" : "NIE",
        naped4x4: data.naped4x4 == "tak" ? "TAK" : "NIE",
    }


    let ctx = {};

    coll1.insert(obj, function (err, newObj) {
        console.log("dodano doukemnt (obiekt): ");
        console.log(newObj);
        console.log("losowe id dokumentu: " + newObj._id);
        ctx = {
            info: `new car with id ${newObj._id} added to database`
        }
    })
    setTimeout(() => {
        res.render('addCar.hbs', ctx);
    }, 100)// nie podajemy ścieżki tylko nazwę pliku
})

app.get("/carList", function (req, res) {
    let ctx = {}
    coll1.find({}, function (err, docs) {
        //zwracam dane w postaci JSON
        ctx = docs;
    });
    setTimeout(() => {
        res.render('carList.hbs', ctx);
    }, 50)// nie podajemy ścieżki tylko nazwę pliku
})

app.get("/deleteCar", function (req, res) {


    data = req.query;
    coll1.remove({ _id: data.id }, { multi: true }, function (err, numRemoved) {
        console.log("usunięto dokumentów: ", numRemoved)
    });
    setTimeout(() => {
        res.redirect('carList');
    }, 100)// nie podajemy ścieżki tylko nazwę pliku
})

app.get("/editCar", function (req, res) {
    let ctx = {}
    coll1.find({}, function (err, docs) {
        ctx = docs;
    });
    setTimeout(() => {
        res.render('editCar.hbs', ctx);
    }, 50)// nie podajemy ścieżki tylko nazwę pliku
})

app.get("/updateCar", function (req, res) {
    let data = req.query;
    coll1.update({ _id: data.id }, { ubezpieczony: data.ubezpieczony, benzyna: data.benzyna, uszkodzony: data.uszkodzony, naped4x4: data.naped4x4 }, {}, function (err, numReplaced) { console.log(numReplaced) })
    setTimeout(() => {
        res.redirect('editCar');
    }, 50)// nie podajemy ścieżki tylko nazwę pliku
})



// const doc = {
//     a: "a",
//     b: "b"
// };

// coll1.insert(doc, function (err, newDoc) {
//     console.log("dodano doukemnt (obiekt): ");
//     console.log(newDoc);
//     console.log("losowe id dokumentu: " + newDoc._id);
// })

// console.log("PRZED FOR: " + new Date().getMilliseconds())
// for (let i = 0; i < 3; i++) {
//     let doc = {
//         a: "a" + i,
//         b: "b" + i
//     };
//     coll1.insert(doc, function (err, newDoc) {
//         console.log("id dokumentu: " + newDoc._id, "DODANO: " + new Date().getMilliseconds())
//     });
// }
// console.log("PO FOR: " + new Date().getMilliseconds())

// coll1.findOne({ _id: 'fsOQ8YC8HqqiPiFr' }, function (err, doc) {
//     console.log("----- obiekt pobrany z bazy: ", doc)
//     console.log("----- formatowanie obiektu js na format JSON: ")
//     console.log(JSON.stringify(doc, null, 5))
// });

// coll1.find({}, function (err, docs) {
//     //zwracam dane w postaci JSON
//     console.log("----- tablica obiektów pobrana z bazy: \n")
//     console.log(docs)
//     console.log("----- sformatowany z wcięciami obiekt JSON: \n")
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// });

// coll1.find({ a: "a1" }, function (err, docs) {
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// });

// coll1.count({}, function (err, count) {
//     console.log("dokumentów jest: ", count)
// });

// coll1.count({ a: "a1" }, function (err, count) {
//     console.log("dokumentów jest: ", count)
// });

// coll1.remove({ a: "a1" }, { multi: true }, function (err, numRemoved) {
//     console.log("usunięto dokumentów: ", numRemoved)
// });

// coll1.remove({}, { multi: true }, function (err, numRemoved) {
//     console.log("usunięto wszystkie dokumenty: ", numRemoved)
// });

