const Category = require('./Category');
const Cart = require('./Cart');
const Image = require('./Image');
const Product = require('./Product');
const User = require('./User');
const Purchase = require('./Purchase');

Category.hasMany(Product);
Product.belongsTo(Category);

Image.belongsTo(Product);
Product.hasMany(Image);

User.hasMany(Cart);
Cart.belongsTo(User);

Cart.belongsTo(Product);
Product.hasMany(Cart);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);