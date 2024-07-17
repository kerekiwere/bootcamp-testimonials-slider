const btnLeft = document.getElementById("button-left");
const btnRight = document.getElementById("button-right");
const content = document.getElementById("content");
const images = document.getElementById("images");
let data;
let slideIndex = 1;

// Function to update the slider based on the current slide index
function updateSlider() {
  // Remove the 'active' class from the currently active slide
  document
    .querySelectorAll(`[data-slide="${slideIndex}"]`)
    .forEach((element) => element.classList.remove("active"));

  // Update the slide index based on which button was clicked
  if (this.id === "button-left") {
    slideIndex--;
    if (slideIndex < 1) {
      slideIndex = data.length;
    }
  } else if (this.id === "button-right") {
    slideIndex++;
    if (slideIndex > data.length) {
      slideIndex = 1;
    }
  }

  // Add the 'active' class to the new active slide
  document
    .querySelectorAll(`[data-slide="${slideIndex}"]`)
    .forEach((element) => element.classList.add("active"));
}

// Function to generate HTML elements for each testimonial
function generateHTML(item) {
  // Create blockquote element for testimonial text
  const blockquote = document.createElement("blockquote");
  blockquote.classList.add("testimonials__quote");
  item.id == 1 ? blockquote.classList.add("active") : null;
  blockquote.setAttribute("data-slide", item.id);
  blockquote.innerHTML = `
    <p>${item.testimonial}</p>
    <footer>
    ${item.name} <span>${item.position}</span>
    </footer>
    `;
  content.appendChild(blockquote);

  // Create img element for testimonial image
  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  item.id == 1 ? img.classList.add("active") : null;
  img.setAttribute("data-slide", item.id);
  images.appendChild(img);
}

// Asynchronous function to fetch testimonials data
async function fetchData() {
  const url = "testimonials.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    data = await response.json();
    data.map(generateHTML);
  } catch (error) {
    console.error(error.message);
  }
}
fetchData();

// Add event listeners to the navigation buttons
btnRight.addEventListener("click", updateSlider);
btnLeft.addEventListener("click", updateSlider);
