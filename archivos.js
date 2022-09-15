const fs = require('fs');

class Contenedor {
    constructor(url){
        this.url = url;
    }

    async #readFile(){
        try{
            const content = await fs.promises.readFile(this.url, 'utf-8');
            return JSON.parse(content);
        }catch(err){
            console.log(err);
        }
    }

    async save(product){
        const products = await this.#readFile();
        if(products !== undefined){
            await fs.promises.writeFile(this.url, JSON.stringify([  ...products, {...product, id: products[products.length - 1].id + 1 }], null, 2), 'utf-8');
            const newProducts = await this.#readFile();
            return newProducts[newProducts.length - 1].id;
        }else{
            await fs.promises.writeFile(this.url, JSON.stringify([ {...product, id: 1} ], null, 2), 'utf-8');
            return 1;
        }  
    }

    async getAll(){
        try {
            const products = await this.#readFile();
            return products;
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id){
        try {
            const products = await this.#readFile();
            let product = products.find(product => product.id === id);
            return product;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.url,'[\n\n]');
            console.log('Archivo Eliminado.');
        } catch (err) {
            console.log(err);
        }
    }

    async deleteById(id){
        try {
            const products = await this.#readFile();
            const productsNotDeleted = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.url, JSON.stringify(productsNotDeleted, null, 4), 'utf-8');
            console.log(`Producto ${id} eliminado.`);
        } catch (err) {
            console.log(err);
        }
    }
}

/* const producto = {
    title: 'Gorra',
    price: '500',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_829162-MLM50003185771_052022-W.jpg'
}*/

const contenedor = new Contenedor('productos.txt');

/*comercio.save(producto).then(response => console.log(`Producto con el id: ${response} agregado.`));

setTimeout(() => {

    comercio.getById(2).then(response => console.log(response));
    comercio.deleteById(2);

    comercio.getAll().then(response => console.log(response));
    comercio.deleteAll();

}, 1000);*/

module.exports = contenedor;