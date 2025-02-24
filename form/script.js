const isEmployed = document.querySelector("input[type=checkbox]");
isEmployed.addEventListener("change", () => {
  const companyName = document.getElementById("companyName");
  companyName.disabled = !companyName.disabled;
});
function isValid(value) {
  if (!/^[a-z0-9]+$/i.test(value)) {
    return false;
  }
  if (value.length > 10 || value.length < 3) {
    return false;
  }
  return true;
}
const inputs = document.querySelectorAll("input:not([type=checkbox])");
// biome-ignore lint/complexity/noForEach: <explanation>
inputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (isValid(input.value)) {
      input.parentElement.classList.remove("invalid");
    } else {
      input.parentElement.classList.add("invalid");
    }
  });
});
const submitBtn = document.getElementById("submitBtn");
submitBtn.onclick = () => {
  const inputs = document.querySelectorAll("input:not([type=checkbox])");
  // biome-ignore lint/complexity/noForEach: <explanation>
  inputs.forEach((input) => {
    if (isValid(input.value)) {
      input.parentElement.classList.remove("invalid");
    } else {
      input.parentElement.classList.add("invalid");
    }
  });
};
