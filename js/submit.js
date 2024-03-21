// function submit() {
//   console.log("Submitting...");
//   // 👇 Entered OTP
//   let otp = "";
//   inputs.forEach((input) => {
//     otp += input.value;
//     input.disabled = true;
//     input.classList.add("disabled");
//   });
//   console.log(otp);
//   // 👉 Call API below
// }
function submit() {
  console.log("Submitting...");
  // 👇 Entered OTP
  let otp = "";
  let allFilled = true;

  inputs.forEach((input) => {
    otp += input.value;
    if (input.value.trim() === "") {
      allFilled = false;
      return; // Exit forEach loop early if any input is empty
    }
    if (input.disabled) {
      input.disabled = false;
      input.classList.remove("disabled");
    }
  });
  const errorToast = document.getElementById("errorToast");
  const successToastContent = errorToast.querySelector(".toast-body");

  if (!allFilled) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(errorToast, {
      delay: 3000,
    });
    errorToast.addEventListener("show.bs.toast", () => {
      successToastContent.textContent = "Please fill all fields.";
    });
    toastBootstrap.show();
    return;
  }

  //
  errorToast.addEventListener("show.bs.toast", () => {
    successToastContent.textContent = "Success! All fields are filled.";
    errorToast.classList.remove("text-bg-danger");
    errorToast.classList.add("text-bg-success");
  });
  const successToastBootstrap = bootstrap.Toast.getOrCreateInstance(
    errorToast,
    {
      delay: 3000,
    }
  );
  successToastBootstrap.show();

  console.log(otp);

  // 👉 Call API below
}
