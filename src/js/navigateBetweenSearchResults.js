var inputField = document.querySelector('#js-searchGitUsersInput');

inputField.addEventListener("keydown", function(e) {
  if(e.keyCode === 40) {
    //down arrow
    moveHighlightDown();
  }else if(e.keyCode === 38) {
    //up arrow
    moveHighlightUp();
  } else if(e.keyCode === 13) {
    //enter
    clickHighlightedLink();
  }
});


  function moveHighlightUp() {
    var searchResults = document.querySelectorAll('.js-searchResult');
    var numberOfSearchResults = searchResults.length;

    for(var i = 0; i < numberOfSearchResults; i++) {
      if(searchResults[i].classList.contains('highlight') && i != 0) {
        searchResults[i].classList.remove('highlight');
        searchResults[i-1].classList.add('highlight');
        return
      }
    }
  }


  function moveHighlightDown() {
    var searchResults = document.querySelectorAll('.js-searchResult');
    var numberOfSearchResults = searchResults.length;

    for(var i = 0; i < numberOfSearchResults; i++) {
      if(searchResults[i].classList.contains('highlight') && i != numberOfUsersToShow - 1) {
        searchResults[i].classList.remove('highlight');
        searchResults[i+1].classList.add('highlight');
        return
      }
    }
  };


  function clickHighlightedLink() {
    document.querySelector('.highlight a').click();
  };
