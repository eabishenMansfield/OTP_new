const inputs = document.querySelectorAll(".otp-field input");

inputs.forEach((input, index) => {
  input.dataset.index = index;
  input.addEventListener("keyup", handleOtp);
  input.addEventListener("paste", handleOnPasteOtp);
});

function handleOtp(e) {
  const input = e.target;
  let value = input.value;
  let isValidInput = value.match(/[0-9a-z]/gi);
  input.value = "";
  input.value = isValidInput ? value[0] : "";

  let fieldIndex = input.dataset.index;
  if (fieldIndex < inputs.length - 1 && isValidInput) {
    input.nextElementSibling.focus();
  }

  if (e.key === "Backspace" && fieldIndex > 0) {
    input.previousElementSibling.focus();
  }

  if (fieldIndex == inputs.length - 1 && isValidInput) {
    //   Here goes submit code
    submit();
  }
}

function handleOnPasteOtp(e) {
  const data = e.clipboardData.getData("text");
  const value = data.split("");
  if (value.length === inputs.length) {
    inputs.forEach((input, index) => (input.value = value[index]));
    submit();
  }
}

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
      return;
    }

    input.disabled = true;
    input.classList.add("disabled");
  });
  const errorToast = document.getElementById("errorToast");

  if (!allFilled) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(errorToast, {
      delay: 3000,
    });
    toastBootstrap.show();
    inputs.forEach((input) => {
      input.disabled = false;
      input.classList.remove("disabled");
      input.focus();
    });
    return;
  }

  //   ***** for testing***** //
  //   ***** for testing***** //
  //   ***** for testing***** //

  var modal1 = new bootstrap.Modal(document.getElementById("successmodal"));

  modal1.show();

  //   ***** for testing***** //
  //   ***** for testing***** //
  //   ***** for testing***** //

  // 👉 Call API below
}
