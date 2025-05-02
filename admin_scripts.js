function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
  }
  
  function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
  }  