document.addEventListener('DOMContentLoaded', function(event) {
  var toggleButton = Sizzle('.mobile-docs-toggle')[0];
  var sidebar = Sizzle ('aside.sidebar')[0];
  
  toggleButton.addEventListener("click", function(e){           
    sidebar.classList.toggle('open');        
  });    
  
});
