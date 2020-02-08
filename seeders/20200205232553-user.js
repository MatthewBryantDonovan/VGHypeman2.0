'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('users', [
        {
          username: 'GIR',
          picture: 'https://i.pinimg.com/originals/85/1a/76/851a76cc168d1e098b23bb2310dfc3a3.jpg',
          password: 'doom1',
          favoriteGame: ':-:Donkey kong:-:Tomb Raider: Last Arch:-:Gears of war',
          favoriteArt: ':-:https://images-na.ssl-images-amazon.com/images/I/81SSaRmo2gL._AC_SL1500_.jpg:-:https://s3.gaming-cdn.com/images/products/5852/orig/shadow-of-the-tomb-raider-definitive-edition-cover.jpg :-:https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/g/e/a/gears-war-wallpaper-b70a3.jpg',
          email: 'gir@idontknow.com'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('users', null, {});
   
  }
};
