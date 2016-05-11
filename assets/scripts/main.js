document.addEventListener('DOMContentLoaded', function(event) {
  var toggleButton = Sizzle('.mobile-docs-toggle')[0];
  var sidebar = Sizzle ('aside.sidebar')[0];
  
  toggleButton.addEventListener("click", function(e){           
    sidebar.classList.toggle('open');        
  });
  /*function resize() {
      if (window.innerWidth>=820 && sidebar.classList.contains('open'))
          sidebar.classList.toggle('open');
  }  
  window.addEventListener("resize", resize);*/  
});

