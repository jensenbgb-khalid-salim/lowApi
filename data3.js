

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
app.use(express.static('public'));

const adapter = new FileSync("db.json");
const db = low (adapter);




// Set some defaults (required if your JSON file is empty)
db.defaults({ products: [], carts: [] }).write();

console.log('Using read(): ', db.read().value());
console.log('Using get(): ', db.get('products').value());

/*db.get("products"). push({id:1, type: "skor", price: 2000, company :"Nike", imgUrl: 'https://unsplash.com/photos/164_6wVEHfI' }).write();

db.get("products"). push({id:2, type: "T-shirt", price: 700, company :"Azar", imgUrl: 'https://unsplash.com/photos/tWOz2_EK5EQ'}).write();
db.get("products"). push({id:3, type: "Strumpor", price: 900, company :"Addidas", imgUrl:'https://unsplash.com/photos/sYgzIZKxqyA'}).write();

db.get("products"). push({id:4, type: "Byxor", price: 500, company :"Team-mate", imgUrl:'https://unsplash.com/photos/17qC7l19hMI'}).write();
db.get("products"). push({id:5, type: "Underkläder", price: 100, company :"Acises" , imgUrl:'https://unsplash.com/photos/0ceZx9mL6_c'}).write(); 
*/

app.get(`/api/products/getAll`, (req,res) => {


  AllProducts = db.get(`products`).value();
  res.send(AllProducts);
  console.log(AllProducts)
});


app.post(`/api/products/carts/:id`, (req,res) =>  {
let TheProoduct = db.get(`products`).find ({id:parseInt(req.params.id)}).value();

if (!TheProoduct) return res.status(404).send(" the proudect is not existing");

let proudectExist= db.get(`carts`).find ({id:parseInt(req.params.id)}).value();

if (proudectExist){

  res.send("proudect are alredy existing")
}
else {

  db.get("carts").push(TheProoduct).write();
  console.log ("this proudect id selected:",TheProoduct);


}

res.send(JSON.stringify(TheProoduct));
console.log(TheProoduct);


})


         

app.get(`/api/carts/getAll`, (req,res) => {


  const Allcarts = db.get(`carts`).value();
  res.send(Allcarts);
  console.log(Allcarts)
});
      


app.delete(`/api/carts/delete/:id`, (req,res) => {


 let deletecart = db.get(`carts`).remove({id:parseInt(req.params.id)}).write();
  res.send( " the proudect is deleted now",deletecart );

  console.log(deletecart)
 








});




     app.get('/', (req, res) => res.send('Hello'))


const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) 