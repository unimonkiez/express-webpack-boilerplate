import App from 'app/app.js';

/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
function MainController(
  // LocalStorage, QueryService
) {
  console.log('Home controller');
}
MainController.$inject = [];
App.controller('MainController', MainController);
