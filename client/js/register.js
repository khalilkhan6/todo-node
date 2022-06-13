const registerBtn = document.getElementById("registerBtn");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const user = {
    name: fullName.value,
    email: email.value,
    password: password.value,
  };
  console.log(user);
  fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.code === 11000) {
        alert("Email already exists");
      } else if (data.message === undefined) {
        alert("User created successfully");
        window.location.href = "././login.html";
      } else {
        alert(data.message);
      }
    })
    .catch((err) => console.log(err));
});
