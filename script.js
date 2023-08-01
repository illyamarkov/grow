document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const uploadBtn = document.getElementById("uploadBtn");
  
    uploadBtn.addEventListener("click", () => {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        uploadImageToImgur(file);
      } else {
        console.log("Please select an image.");
      }
    });
  });
  
  function uploadImageToImgur(file) {
    const apiKey = "24dd3ffbe5e7c58"; // Replace with your Imgur API key
  
    const formData = new FormData();
    formData.append("image", file);
  
    fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Image uploaded successfully!");
        console.log("Image link:", data.data.link);
      } else {
        console.error("Image upload failed.");
      }
    })
    .catch((error) => {
      console.error("Error occurred while uploading:", error);
    });
  }
  