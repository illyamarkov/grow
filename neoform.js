// var imageInput = document.getElementById("secretImageInput");

const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modal = document.getElementById("myModal");

document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const modal = document.getElementById("myModal");
    
  
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    const fileInput = document.getElementById("fileInput");
  });
  
  var imageInput = document.getElementById("secretImageInput");
  async function handleFormSubmit(event) {
      // event.preventDefault(); // Prevent the default form submission
      imageInput.value = 'undefined';

      event.preventDefault();

      return new Promise(resolve => {
        imageCheck();
          const checkInterval = setInterval(() => {
          // Replace this with your logic to get the actual value
              if (imageInput.value != 'undefined') {
                  document.getElementById("growform").submit();
                  console.log("submitted")
                  document.getElementById("growform").reset();
                  modal.style.display = "none";
                  clearInterval(checkInterval);
                  resolve(imageInput.value);
              }
          }, 100); // Adjust the interval (in milliseconds) to your needs
      });
  }

  async function imageCheck() {
      const fileInput = document.getElementById("fileInput");

      if (fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const imageLink = await uploadImageToImgur(file);
          console.log("found file");

          // Set the image link as the value of the input field
          imageInput.value = imageLink;
      } else {
          console.log("Please select an image.");
          imageInput.value = 'NO IMAGE';
      }
  }

  function uploadImageToImgur(file) {
      const apiKey = "24dd3ffbe5e7c58"; // Replace with your Imgur API key
      const formData = new FormData();
      formData.append("image", file);

      return fetch("https://api.imgur.com/3/image", {
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
                  imageInput.value = data.data.link;
                  return data.data.link; // Return the image link
              } else {
                  console.error("Image upload failed.");
                  imageInput.value = 'ERROR';
                  throw new Error("Image upload failed.");
              }
          })
          .catch((error) => {
              console.error("Error occurred while uploading:", error);
              throw error;
          });
  }