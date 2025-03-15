let currentBtn = "";

// pronounce Word
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// Word Details Moad

const loadDetails = (id) => {
  url = `https://openapi.programming-hero.com/api/word/${id}`;
  document.getElementById("word_details").showModal();
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data.data));
};

function showDetails(details) {
  const detailBox = document.getElementById("details");
  const div = document.createElement("div");
  detailBox.innerHTML = ``;
  div.classList.add("space-y-5");
  div.innerHTML = `
    <h2 class="text-2xl font-semibold">${
      details.word
    }( <i class="fa-solid fa-microphone-lines"></i> ${
    details.pronunciation
  } )</h2>
    <div class="space-y-2">
        <h3 class="text-base font-semibold">Meaning</h3>
        <h4 class="bangla text-base font-medium">${
          details.meaning || "অর্থ পাওয়া যায়নি"
        }</h4>
    </div>

    <div class="space-y-2">
        <h3 class="text-base font-semibold">Example</h3>
        <p class="text-base font-medium opacity-80">${details.sentence}</p>
    </div>

    <div class="space-y-2">
        <h3 class="text-base hind font-semibold">সমার্থক শব্দ গুলো</h3>
        <div id="synonyms" class="flex gap-3">
            ${
              details.synonyms.length
                ? details.synonyms
                    .map(
                      (synonym) =>
                        `<button class="rounded-sm bg-[#EDF7FF] border border-[#D7E4EF] px-4 py-2 text-base font-medium opacity-80">${synonym}</button>`
                    )
                    .join("")
                : '<p class="text-base font-medium opacity-80">No synonyms found</p>'
            }
        </div>
    </div>
`;

  detailBox.append(div);
}

// Lessons card load
const loadLessons = (id) => {
  showLoading();
  const minimumLoadTime = new Promise((resolve) => setTimeout(resolve, 200));
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);
  Promise.all([fetch(url), minimumLoadTime])
    .then(([res]) => res.json())
    .then((data) => {
      const btns = document.getElementsByClassName("btn");
      for (let btn of btns) btn.classList.remove("active");
      const btn = document.getElementById(`btn-${id}`);
      if (`btn-${id}` === currentBtn) {
        hideLoading();
        btn.classList.remove("active");
        const lessonContainer = document.getElementById("lessonCards");
        lessonContainer.innerHTML = ``;
        const defaultText = document.getElementById("defaultTexScren");
        defaultText.classList.remove("hidden");
        const noLessons = document.getElementById("noLessons");
        noLessons.classList.add("hidden");
        currentBtn = "";
        return;
      }
      currentBtn = `btn-${id}`;
      btn.classList.add("active");
      hideLoading();
      showLessons(data.data);
    });
};

function showLessons(lessons) {
  const noLessons = document.getElementById("noLessons");
  noLessons.classList.add("hidden");
  const defaultText = document.getElementById("defaultTexScren");
  defaultText.classList.add("hidden");

  const lessonContainer = document.getElementById("lessonCards");
  lessonContainer.innerHTML = ``;

  if (lessons.length == 0) {
    noLessons.classList.remove("hidden");
    return;
  }

  for (let lesson of lessons) {
    const card = document.createElement("div");
    card.classList.add(
      "bg-white",
      "rounded-lg",
      "p-3",
      "shadow-sm",
      "border-[#EDF7FF]"
    );

    card.innerHTML = `
        <div class="border border-[#EDF7FF] p-3 rounded-md hover:bg-[#EDF7FF]">
        <div class="flex flex-col gap-4 justify-center items-center mb-9">
            <h4 class="text-xl font-bold">${lesson.word}</h4>
            <h5 class="text-sm font-medium">Meaning / Pronounciation</h5>
            <h4 class="bangla text-xl font-semibold opacity-80">"${
              lesson.meaning != null ? lesson.meaning : "অর্থ নেই"
            } / ${lesson.pronunciation}"</h4>
        </div>
        <div class="flex justify-between">
            <button onclick="loadDetails(${
              lesson.id
            })" class="bg-[#1A91FF1A] py-2 px-3 rounded-sm cursor-pointer hover:bg-slate-300"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${
              lesson.word
            }')" class="bg-[#1A91FF1A] py-2 px-3 rounded-sm cursor-pointer hover:bg-slate-300"><i class="fa-solid fa-volume-high"></i></i></button>
        </div>
        </div>
    `;

    lessonContainer.append(card);
  }
}

// Leasons button
const loadBtn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => showBtn(data.data));
};

function showBtn(lessons) {
  const btnContainer = document.getElementById("btn-container");
  for (let lesson of lessons) {
    const div = document.createElement("div");
    div.innerHTML = `
            <button onclick="loadLessons(${lesson.level_no})" id="btn-${lesson.level_no}" class="btn btn-primary btn-outline text-xs font-semibold"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
    btnContainer.append(div);
  }
}

const showLoading = () => {
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("super-container").classList.add("hidden");
};

const hideLoading = () => {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("super-container").classList.remove("hidden");
};

loadBtn();

document.getElementById("noLessons").classList.add("hidden");
