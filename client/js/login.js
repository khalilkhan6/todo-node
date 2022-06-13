const loginBtn = document.getElementById("loginBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const user = {
    email: email.value,
    password: password.value,
  };
  try {
    const response = await fetch("http://127.0.0.1:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      throw new Error(data.error);
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("login", data.user.login);
    }
    // localStorage.setItem("token", data.token);
    window.location = "././index.html";
  } catch (err) {
    alert("invalid credentials");
  }
});
