console.log("Signup frontend javascript file");
$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      const fileType = uploadFile["type"];
      const validImageType = ["image/jpg", "image/jpeg", "image/png"];

      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg and png!");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
      }

      filename = $(this)[0].files[0].name;
      $(this).siblings(".upload-name").val(filename);
    }
  });
});

function validateSignupForm() {
  console.log("Function is working");
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPassword === "" ||
    memberPhone === "" ||
    confirmPassword === ""
  ) {
    alert("Please Insert All Required Fields!");
    return false;
  }
  if (memberPassword !== confirmPassword) {
    alert("Password is different, please check it! ");
    return false;
  }

  const inputMember = $(".member-image").get(0);
  const memberImage =
    inputMember && inputMember.files.length > 0
      ? $(".member-image").get(0).files[0].name
      : null;
  if (!memberImage) {
    alert("Please Instert Restaurant Image!");
    return false;
  }
  return true;
}
