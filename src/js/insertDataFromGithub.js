var numberOfUsersToShow = 5;
var inputField = document.querySelector('#js-searchGitUsersInput');
var searchResults;

//List.js variables
var options = {
  valueNames: [
    'login',
    { attr: 'href', name: 'url' },
    { attr: 'src', name: 'avatar' }
  ],
  item: 'js-searchResult'
};

var values = [];
var list = document.querySelector('.list');
var userList = new List('js-githubUserSearch', options, values);


inputField.addEventListener("keypress", function(e) {
  setTimeout(getDataFromGithub, 50);
});


inputField.addEventListener("keydown", function(e) {
  if(e.keyCode === 8) {
    //backspace
    setTimeout(getDataFromGithub, 50);
  }
});


function getDataFromGithub() {
  var inputFieldValue = inputField.value;
  var url = "https://api.github.com/search/users?q=" + inputFieldValue;

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", url);
  oReq.send();
}


function reqListener() {
  var matchingUsersList = JSON.parse(this.responseText)['items'] || [];
  processUsers(matchingUsersList);
  emptyList(list);
  insertItemsInList();
  setTimeout(addInitialHighlight, 20);
}


function processUsers(usersList) {
  values = [];
  numberOfUsersToShow = Math.min(usersList.length, numberOfUsersToShow);

  var user;
  for(var userNumber = 0; userNumber < numberOfUsersToShow; userNumber++) {
    var userData = { login: '', url:'', avatar: '' };
    user = usersList[userNumber];

    userData.login = user.login;
    userData.url = user.html_url;
    userData.avatar = user.avatar_url;

    values.unshift(userData);
  }

}


function insertItemsInList() {
  userList = new List('js-githubUserSearch', options, values);
}


function emptyList(list) {
  list.innerHTML = '';
}


function addInitialHighlight() {
  document.querySelector('.js-searchResult').classList.add('highlight');
}
