// ========== BACKGROUND COLOR CHANGER ==========
const colorBtn = document.getElementById("colorBtn");
const colorPicker = document.getElementById("colorPicker");

// Load saved background color
document.body.style.backgroundColor = localStorage.getItem("bgColor") || "white";

// Update background color
function changeBackground(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem("bgColor", color);
}

colorBtn.addEventListener("click", function() {
    changeBackground(getRandomColor());
});

colorPicker.addEventListener("input", function() {
    changeBackground(colorPicker.value);
});

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// ========== VIDEO CONTROLS ==========
const video = document.getElementById("video");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const muteBtn = document.getElementById("muteBtn");
const autoPlay = document.getElementById("autoPlay");

// Load and apply autoplay preference from localStorage
if (localStorage.getItem("autoPlay") === "true") {
    autoPlay.checked = true;
    video.muted = true; // Ensure video is muted before autoplay
    video.play();
}

playBtn.addEventListener("click", () => video.play());
pauseBtn.addEventListener("click", () => video.pause());
muteBtn.addEventListener("click", () => video.muted = !video.muted);

// Handle autoplay toggle
autoPlay.addEventListener("change", function() {
    if (autoPlay.checked) {
        video.muted = true; // Mute the video to allow autoplay
        video.play();
        localStorage.setItem("autoPlay", "true");
    } else {
        video.pause();
        localStorage.removeItem("autoPlay");
    }
});

// ========== LIST MANIPULATION ==========
const itemList = document.getElementById("itemList");
const newItemInput = document.getElementById("newItem");
const addItemBtn = document.getElementById("addItem");

// Function to create a new list item with a delete button
function createListItem(text) {
    let li = document.createElement("li");
    li.textContent = text;

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    // Delete item on button click
    deleteBtn.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(deleteBtn);
    itemList.appendChild(li);
}

// Add new item to the list
addItemBtn.addEventListener("click", function() {
    let itemText = newItemInput.value.trim();
    if (itemText !== "") {
        createListItem(itemText);
        newItemInput.value = ""; // Clear input field
    }
});

// Initialize the default items with delete buttons
document.querySelectorAll("#itemList li").forEach(item => {
    let text = item.textContent;
    item.innerHTML = "";
    createListItem(text);
});

// ========== DARK MODE TOGGLE ==========
const darkModeToggle = document.getElementById("darkModeToggle");

function applyDarkMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    // Change all text colors dynamically
    document.querySelectorAll("h1, h2, p, label, button, input, ul, li").forEach(element => {
        element.style.color = isDark ? "white" : "black";
    });

    localStorage.setItem("darkMode", isDark);
}

// Load saved dark mode preference
if (localStorage.getItem("darkMode") === "true") {
    darkModeToggle.checked = true;
    applyDarkMode(true);
}

darkModeToggle.addEventListener("change", function() {
    applyDarkMode(darkModeToggle.checked);
});

// ========== RESET FUNCTIONALITY ==========
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function() {
    // Reset background color
    document.body.style.backgroundColor = "white";
    localStorage.removeItem("bgColor");

    // Reset dark mode
    darkModeToggle.checked = false;
    applyDarkMode(false);
    localStorage.removeItem("darkMode");

    // Reset video autoplay
    autoPlay.checked = false;
    localStorage.removeItem("autoPlay");

    // Reset list items
    itemList.innerHTML = "";

    // Reset video
    video.pause();
    video.currentTime = 0;
});