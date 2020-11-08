
mongoimport --db SUPERVENTES --collection membres --file membres.json --jsonArray --drop

mongoimport --db SUPERVENTES --collection produits --file listeDeVente.json --jsonArray --drop

mongoimport --db SUPERVENTES --collection paniers --file panier.json --jsonArray --drop


