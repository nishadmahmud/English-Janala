document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  if (name === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter your name!",
    });
    return;
  }

  if (password === "123456") {
    Swal.fire({
      title: "Login successful!",
      text: "You have successfully logged in!",
      icon: "success",
    });

    const hero = document.getElementById("hero");
    const nav = document.getElementById("nav");
    const learn = document.getElementById("learnContainer");
    const faq = document.getElementById("faq");
    hero.classList.add("hidden");
    nav.classList.remove("hidden");
    learn.classList.remove("hidden");
    faq.classList.remove("hidden");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong password!",
    });
  }
});

document.getElementById("logout").addEventListener("click", () => {
  const hero = document.getElementById("hero");
  const nav = document.getElementById("nav");
  const learn = document.getElementById("learnContainer");
  const faq = document.getElementById("faq");
  hero.classList.remove("hidden");
  nav.classList.add("hidden");
  learn.classList.add("hidden");
  faq.classList.add("hidden");
});
