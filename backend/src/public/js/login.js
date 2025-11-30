let emailUser = document.getElementById("correoUser");
let passwordUser = document.getElementById("passwordUser");

let acceso_rapido = document.getElementById("acceso");
acceso_rapido.addEventListener("click", () => {
    emailUser.value = "gabi@lopez.com";
    passwordUser.value = "gabi"
});