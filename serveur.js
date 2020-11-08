const express = require('express');
const app     = express();
app.use(express.json());
app.use(express.urlencoded({exteded:true}));


/*------------------------------GESTION DES CORS----------------------------*/
    /*--------------c'est des autorisations pour le transfert de données client/serveur */
app.use(function (req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods' ,'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();

});

	
	 /*Module utilisés par Mongo db */

const MongoClient =require('mongodb').MongoClient;
const ObjectID    =require('mongodb').ObjectId;
const url         = "mongodb://localhost:27017";


MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
	let db = client.db("SUPERVENTES"); // declaration de la bd


	// Liste des produits
app.get("/produits", (req,res) => {
	console.log("/produits");
	try{
		db.collection("produits").find().toArray((err, documents) => { 
			res.end(JSON.stringify(documents));  // revois le resultat.
		});
	} catch(e)  {
		console.log("Erreur sur /produits : " + e);
		res.end(JSON.stringify([]));


	}
});


// liste des peroduits par categorie:

app.get("/produits/:categorie", (req,res) => {
	let categorie = req.params.categorie; // recupération du parametre de la route
	console.log("/produits/:categorie "+categorie); // le + pour afficher le lien avec la categorie
	try{
		// je selectione tout les produits de type categorie    {type:categorie})
		db.collection("produits").find({type:categorie}).toArray((err, documents) => {   
			res.end(JSON.stringify(documents)); 
		});
	} catch(e)  {
		console.log("Erreur sur /produits : " + e);
		res.end(JSON.stringify([]));
	}
});


// ajout d'élements à la base de données

app.post("/produit" ,(req,res)=>{
	console.log("route:/produit/ajout avec" +JSON.stringify(req.body));
	try{
		db.collection("produits").insertOne(req.body);
		res.end(JSON.stringify({"message":"ajout de produit effectué avec succès"}));
	} catch(e){
		res.end(JSON.stringify({"message":"probleme sur l'ajout du produit :" +e}));
	}

});  



// Liste des membres
app.get("/membres", (req,res) => {
	console.log("/membres");
	try{
		db.collection("membres").find().toArray((err, documents) => { 
			res.end(JSON.stringify(documents));  // revois le resultat.
		});
	} 
	catch(e)  {
		
    
		console.log("Erreur sur /membres : " + e);
		res.end(JSON.stringify([]));
	}
});

// authentification:-
app.post("/membres/authentification", (req,res) => {
	// information sur le lien de connextion "membre"
	console.log(" Tentative d'authentification pour le membre " +JSON.stringify(req.body));  
	try{
		//() chercher au niveau de db et renvoyer un doccument.json
		db.collection("membres").find(req.body).toArray((err, documents) => {   
			if (documents.length == 1){
				res.end(JSON.stringify({"resultat":1, "message":"authentification réussie" })); // si membre exixtant
			}else{
				res.end(JSON.stringify({"resultat":0, "message":"Mot de passe incorrect" }));//
			}
		});
	} catch(e)  {
		console.log("Erreur sur /membres : " + e);
		res.end(JSON.stringify([]));
	}
});

// connexion d'utilisateurs
app.post("/inscription", (req, res) => { // reception de donnes service post angular vers node
	console.log(" utilisateur ajouter");

	console.log(req.body.nom);   // body c'est le corps de la requette qui contient les donnees renvoyer de angular inscrip.ts
try {
	db.collection("membres").insertOne({ "nom": req.body.nom,      // insert dans mongo les donnes recuperer avec la requette
										  "prenom": req.body.prenom, 
										  "email": req.body.email, 
										  "password": req.body.password });
   
	console.log("Nouveau utilisateur ajouter avec succes");
	res.end("Ajouter");  // le message revoyer pas les donnees
}
catch (e) {
	res.end(JSON.stringify([]));
}

});  


 // Liste des categories

 app.get("/categories", (req,res) => {
	console.log("/categories");
	categories = [];  //declaration tableau vide 
	try{
		db.collection("produits").find().toArray((err, documents) => { 
			for(let doccument of documents){
				if (!categories.includes (doccument.type)){
					categories.push(doccument.type);
				}

			}


			res.end(JSON.stringify(categories));  // revois le resultat.
		});
	} catch(e)  // e excception en cas d'erreur  
		
	{
		console.log("Erreur sur /categories : " + e);  // le e																
		res.end(JSON.stringify([]));
	}
});


/* service d'ajout au panier*/

app.post("/ajoutpanier", (req, res) => { // reception de donnes service post angular vers node
	console.log(" panier creer");

	console.log(req.body.nom);   // body c'est le corps de la requette qui contient les donnees renvoyer de angular inscrip.ts
try {
	db.collection("panier").insertOne({ "nom": req.body.nom,      // insert dans mongo les donnes recuperer avec la requette
     									"email": req.body.email 
									 });
   
	console.log(" produit ajouter au panier");
	res.end("Ajouter");  // le message revoyer pas les donnees
}
catch (e) {
	console.log();
	res.end(JSON.stringify([]));

}

}); 

app.get("/getPanier/:email", (req,res) => { // methode qui prends comme parametre un email dans sa root
	let email = req.params.email; // recupération du parametre email de la root
	console.log("/panier/:email "+email); // le + pour afficher le lien avec email
	try{
		db.collection("panier").find({email:email}).toArray((err, documents) => {    // je selectione tout les produits  associers au mail
			res.end(JSON.stringify(documents));   //  section  doccum et le resultat de la selection envoyer vers angular
		});
	} catch(e)  {
		console.log("Erreur sur panier : " + e);  
		res.end(JSON.stringify([]));// renvois vide en cas de probls
	}
});





});



console.log('serveur executer');

app.listen(8888);




