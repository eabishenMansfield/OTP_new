const inputs = document.querySelectorAll(".otp-field input");

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Flip, ScrollTrigger, TextPlugin, EasePack);
});
var tl = gsap.timeline();
var tl2 = gsap.timeline();
var tl3 = gsap.timeline();

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

  showSuccess();

  var end = Date.now() + 1 * 1000;
  // go Buckeyes!
  var colors = ["#ff69b4", "#ce009a", "#530196", "#00cc6d"];
  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: {
        x: 0,
      },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: {
        x: 1,
      },
      colors: colors,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  //   ***** for testing***** //
  //   ***** for testing***** //
  //   ***** for testing***** //

  // 👉 Call API below
}

function showSuccess() {
  tl.to(".iconlock", {
    duration: 0.5,
    height: 0,
    width: 0,
  })
    .to(".successicon", {
      duration: 0.8,
      height: 60,
      width: 60,
      ease: "elastic.out(1,0.5)",
      border: "10px solid var(--light-color)",
    })
    .to(
      ".OTPId",
      {
        duration: 1,
        scale: 1.2,
        ease: "elastic.out(1,0.9)",
        opacity: 0,
      },
      "-=0.8"
    )
    .fromTo(
      ".successID",
      {
        scale: 1.2,
      },
      {
        // scale up and back to normal
        duration: 0.8,
        scale: 1,
        ease: "elastic.out(1,0.5)",
        opacity: 1,
      },
      "-=0.6"
    );

  tl2
    .to(".supportheading", {
      duration: 0.2,
      scale: 1.1,
      opacity: 0,
      transformOrigin: "top",
    })
    .to(".supportheading", {
      duration: 0,
      position: "absolute",
    });

  tl3
    .to(".otp-field input", {
      duration: 1,
      height: 0,
      width: 0,
      transformOrigin: "top",
    })
    .to(
      ".otp-field",
      {
        duration: 0,
        opacity: 0,
        height: 0,
        width: 0,
        visibility: "hidden",
        transformOrigin: "top",
      },
      "-=0.5"
    );
  // gsap.to(".landingInfo", {
  //   duration: 0.5,
  //   opacity: 0,
  //   position: "absolute",
  //   transform: "translateY(-05px)",
  // });
  gsap.fromTo(
    ".landingHeading ",
    {
      scale: 0.8,
      text: "OTP Verified",
    },
    {
      duration: 0.8,
      scale: 1,
      ease: "elastic.out(1,1.1)",
      marginBlockEnd: "1rem",
    }
  );
}
