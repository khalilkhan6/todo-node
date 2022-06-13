// login check

if (!localStorage.getItem("token")) {
  window.location = "./login.html";
}
