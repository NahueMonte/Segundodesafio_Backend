class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const existingProduct = this.products.find((product) => product.code === code);

    if (existingProduct) {
      throw new Error('El código de producto ya está en uso.');
    }

    const product = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    return product;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('No se encontró el producto.');
    }

    return product;
  }

  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);
    Object.assign(product, updatedFields);
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error('No se encontró el producto.');
    }

    this.products.splice(index, 1);
  }
}

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Obtener los productos (debe devolver un arreglo vacío)
console.log(productManager.getProducts()); // []

// Agregar un nuevo producto
const product = productManager.addProduct(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
);
console.log(product); // Producto agregado exitosamente

// Obtener los productos nuevamente (debe aparecer el producto recién agregado)
console.log(productManager.getProducts()); // [ { id: 1, title: 'producto prueba', ... } ]

// Obtener un producto por su ID
try {
  const productId = productManager.getProducts()[0].id;
  const product = productManager.getProductById(productId);
  console.log(product); // { id: 1, title: 'producto prueba', ... }
} catch (error) {
  console.log(error.message);
}

// Actualizar un producto
try {
  const productId = productManager.getProducts()[0].id;
  const updatedFields = {
    title: 'Nuevo título',
    price: 300,
  };
  const updatedProduct = productManager.updateProduct(productId, updatedFields);
  console.log(updatedProduct); // Producto actualizado exitosamente
} catch (error) {
  console.log(error.message);
}

// Eliminar un producto
try {
  const productId = productManager.getProducts()[0].id;
  productManager.deleteProduct(productId);
  console.log('Producto eliminado exitosamente');
} catch (error) {
  console.log(error.message);
}
