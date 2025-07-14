class Smoothie {
  constructor(name, size, base, ingredients, sweetener) {
    this.name = name;
    this.size = size;
    this.base = base;
    this.ingredients = ingredients;
    this.sweetener = sweetener;
  }

  calculatePrice() {
    let basePrice = { Small: 4, Medium: 6, Large: 8 }[this.size];
    return (basePrice + this.ingredients.length * 0.5).toFixed(2);
  }

  describe() {
    return `
      <h2>🧾 Smoothie Receipt</h2>
      <p><strong>👤 Name:</strong> ${this.name}</p>
      <p><strong>🍹 Size:</strong> ${this.size}</p>
      <p><strong>🥛 Base:</strong> ${this.base}</p>
      <p><strong>🍓 Ingredients:</strong> ${this.ingredients.join(", ") || "None"}</p>
      <p><strong>🍬 Sweetener:</strong> ${this.sweetener || "None"}</p>
      <p><strong>💰 Total:</strong> $${this.calculatePrice()}</p>
    `;
  }
}

function generateSmoothieName() {
  const moods = ['Tropical', 'Berry', 'Green', 'Power', 'Zesty', 'Funky'];
  const ends = ['Blitz', 'Boost', 'Blast', 'Storm', 'Twist', 'Surge'];
  return (
    moods[Math.floor(Math.random() * moods.length)] +
    ' ' +
    ends[Math.floor(Math.random() * ends.length)]
  );
}

function updateSmoothiePreview(ingredients) {
  const cup = document.getElementById('smoothieCup');
  const name = document.getElementById('smoothieName');
  let color = "#ffc0cb"; // default pink

  if (ingredients.includes("Spinach")) color = "#b6e388";
  else if (ingredients.includes("Blueberry")) color = "#a290d0";
  else if (ingredients.includes("Mango")) color = "#ffcc70";
  else if (ingredients.includes("Peanut Butter")) color = "#d2a679";
  else if (ingredients.includes("Strawberry")) color = "#ff8da1";
  else if (ingredients.includes("Banana")) color = "#fff275";

  cup.style.backgroundColor = color;
  name.textContent = generateSmoothieName();
}

document.getElementById("smoothieForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const size = document.getElementById("size").value;
  const base = document.getElementById("base").value;
  const sweetener = document.getElementById("sweetener").value;

  const ingredients = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(
    (item) => item.value
  );

  const mySmoothie = new Smoothie(name, size, base, ingredients, sweetener);
  document.getElementById("output").innerHTML = mySmoothie.describe();
  updateSmoothiePreview(ingredients);
});

document.getElementById("surpriseBtn").addEventListener("click", () => {
  const names = ["Alex", "Chris", "Taylor", "Sam", "Jordan"];
  const sizes = ["Small", "Medium", "Large"];
  const bases = ["Milk", "Almond Milk", "Yogurt", "Coconut Water"];
  const allIngredients = ["Banana", "Strawberry", "Blueberry", "Mango", "Spinach", "Peanut Butter"];

  document.getElementById("name").value = names[Math.floor(Math.random() * names.length)];
  document.getElementById("size").value = sizes[Math.floor(Math.random() * sizes.length)];
  document.getElementById("base").value = bases[Math.floor(Math.random() * bases.length)];

  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(box => box.checked = false);
  let shuffled = allIngredients.sort(() => 0.5 - Math.random());
  shuffled.slice(0, Math.floor(Math.random() * 4) + 1).forEach(name => {
    document.querySelector(`input[value="${name}"]`).checked = true;
  });

  document.getElementById("sweetener").value = ["Honey", "Stevia", "None", "Maple Syrup"][Math.floor(Math.random() * 4)];
});
