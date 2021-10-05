(function IIFE() {
  // form functionality
  function formFunc() {
    let submitBtn = document.getElementById("form__submit-btn");
    let formInputs = document.getElementsByClassName("form__input");

    submitBtn.addEventListener("click", formSubmitted);

    function formSubmitted(e) {
      e.preventDefault();

      const emailRegExp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      for (let i = 0; i < formInputs.length; i++) {
        const input = formInputs[i];

        // check if inputs' values are empty
        if (input.value === "") {
          displayError(input, "{} cannot be empty");
        } else {
          if (input.getAttribute("type") === "email") {
            const test = emailRegExp.test(input.value);
            if (!test) {
              displayError(input, "Looks like this is not an email");
            } else {
              removeError(input);
            }
          } else {
            removeError(input);
          }
        }
      }

      // function to display input errors
      function displayError(input, errorText) {
        // get error para and icon element
        let errorIconElement = input.nextElementSibling;
        let errorElement = input.nextElementSibling.nextElementSibling;

        // make input border red
        input.style.border = "1px solid hsl(0, 100%, 74%)";

        // give the para the error text
        if (errorText.indexOf("{}") === 0) {
          errorElement.textContent =
            input.getAttribute("data-error") +
            " " +
            errorText.replace("{} ", "");
        } else {
          errorElement.textContent = errorText;
        }

        // remove placeholder values
        input.removeAttribute("placeholder");

        // center the error icon (top: 50% of the input size, and with the css I set transformY(-50%))
        errorIconElement.style.top = input.scrollHeight / 2 + "px";

        // make the para and error icon visible by block display
        errorIconElement.style.display = "block";
        errorElement.style.display = "block";
      }

      // remove errors
      function removeError(input) {
        // get error para and icon element
        let errorIconElement = input.nextElementSibling;
        let errorElement = input.nextElementSibling.nextElementSibling;

        // default input border
        input.style.border = "1px solid #dedede";

        // make the para and error icon invisible by block display
        errorIconElement.style.display = "none";
        errorElement.style.display = "none";
      }
    }
  }

  formFunc();
})();
