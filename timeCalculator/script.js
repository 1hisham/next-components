const mainCardTime = document.querySelector(".main-card-time");
const output = document.querySelector(".total-output");
const mainCardLoc = document.querySelector(".main-card-loc");
const submitBtn = document.querySelector(".submit-btn");
const adjustBtn = document.querySelector(".adjust-btn");

let inputs = ["focustime", "codetime", "activetime", "projecttime"];

function timeCard(inputs) {
  let totalInputTime = inputs.map((item) => {
    console.log(item);

    return ` 
        <div class=card ${item}>
        <h2 class=${item}-heading >${item}</h2>
        <form>
        <label>hours<input  class=${item}-hours type="number" value=0></label><br>
        <label>minutes<input class=${item}-minutes type="number" value=0></label>
        </form>
        </div>`;
  });

  mainCardTime.innerHTML = totalInputTime.join(" ");
}
timeCard(inputs);

function lineOfCodes() {
  let html = `
  <div class="loc-card">
  <form>
  <label>HTML<input class="html-loc" type="number" value=0></label>
  <label>Css<input class="css-loc" type="number" value=0></label>
  <label>JavaScript<input class="js-loc" type="number" value=0></label>
  </form>
  </div>`;
  mainCardLoc.innerHTML = html;
}
lineOfCodes();
const codeHours = document.querySelector(".codetime-hours");
const codeMinutes = document.querySelector(".codetime-minutes");

const activeHours = document.querySelector(".activetime-hours");
const activeMinutes = document.querySelector(".activetime-minutes");

const focusHours = document.querySelector(".focustime-hours");
const focusMinutes = document.querySelector(".focustime-minutes");

const projectHours = document.querySelector(".Projecttime-hours");
const projectMinutes = document.querySelector(".Projecttime-minutes");

// lines of code

const locHtml = document.querySelector(".html-loc");
const locJs = document.querySelector(".js-loc");
const locCss = document.querySelector(".css-loc");

adjustBtn.addEventListener("click", () => {
  let obj = {
    codeHours: codeHours.value,
    codeMinutes: codeMinutes.value,
    activeHours: activeHours.value,
    activeMinutes: activeMinutes.value,
    focusHours: focusHours.value,
    focusMinutes: focusMinutes.value,
    projectHours: projectHours.value,
    projectMinutes: projectMinutes.value,
  };
  let totalLines =
    Number(locHtml.value) + Number(locJs.value) + Number(locCss.value);
  let objLoc = {
    locHtml: locHtml.value,
    locJs: locJs.value,
    locCss: locCss.value,
    locTotal: totalLines,
  };
  localStorage.clear();
  localStorage.setItem("timestatus", JSON.stringify(obj));
  localStorage.setItem("lineOfCodes", JSON.stringify(objLoc));
});

submitBtn.addEventListener("click", () => {
  let obj = {
    codeHours: codeHours.value,
    codeMinutes: codeMinutes.value,
    activeHours: activeHours.value,
    activeMinutes: activeMinutes.value,
    focusHours: focusHours.value,
    focusMinutes: focusMinutes.value,
    projectHours: projectHours.value,
    projectMinutes: projectMinutes.value,
  };
  let totalLines =
    Number(locHtml.value) + Number(locJs.value) + Number(locCss.value);
  let objLoc = {
    locHtml: locHtml.value,
    locJs: locJs.value,
    locCss: locCss.value,
    locTotal: totalLines,
  };

  let updatedObj = calculateValues(obj);
  let updatedObjLoc = calculateLineOfCode(objLoc);
  localStorage.setItem("timestatus", JSON.stringify(updatedObj));
  localStorage.setItem("lineOfCodes", JSON.stringify(updatedObjLoc));

  getDataFormLocal(obj, objLoc);
});
// localStorage.removeItem("timestatus");

function calculateValues(obj) {
  const status = localStorage.getItem("timestatus");
  let items = JSON.parse(status);
  // code time

  let codeBalanceMin =
    (Number(items.codeMinutes) + Number(obj.codeMinutes)) / 60;
  let codeAddHour = 0;
  if (codeBalanceMin >= 1) {
    codeAddHour = 1;
  }
  let codeBalence = (codeBalanceMin % 1) * 60;
  let codeBalFraction = parseFloat(codeBalence).toFixed(2);
  let codeMinutes = Math.ceil(codeBalFraction);
  // active code
  let activeBalanceMin =
    (Number(items.activeMinutes) + Number(obj.activeMinutes)) / 60;
  let activeAddHour = 0;
  if (activeBalanceMin >= 1) {
    activeAddHour = 1;
  }
  let activeBalence = (activeBalanceMin % 1) * 60;
  let activeBalFraction = parseFloat(activeBalence).toFixed(2);
  let activeMinutes = Math.ceil(activeBalFraction);
  //focus
  let focusBalanceMin =
    (Number(items.focusMinutes) + Number(obj.focusMinutes)) / 60;
  let focusAddHour = 0;
  if (focusBalanceMin >= 1) {
    focusAddHour = 1;
  }
  let focusBalence = (focusBalanceMin % 1) * 60;
  let focusBalFraction = parseFloat(focusBalence).toFixed(2);
  let focusMinutes = Math.ceil(focusBalFraction);
  // project
  let projectBalanceMin =
    (Number(items.projectMinutes) + Number(obj.projectMinutes)) / 60;
  let projectAddHour = 0;
  if (projectBalanceMin >= 1) {
    projectAddHour = 1;
  }
  let projectBalence = (projectBalanceMin % 1) * 60;
  let projectBalFraction = parseFloat(projectBalence).toFixed(2);
  let projectMinutes = Math.ceil(projectBalFraction);

  let newObj = {
    codeHours: Number(items.codeHours) + Number(obj.codeHours) + codeAddHour,
    codeMinutes: codeMinutes,
    activeHours:
      Number(items.activeHours) + Number(obj.activeHours) + activeAddHour,
    activeMinutes: activeMinutes,
    focusHours:
      Number(items.focusHours) + Number(obj.focusHours) + focusAddHour,
    focusMinutes: focusMinutes,
    projectHours:
      Number(items.projectHours) + Number(obj.projectHours) + projectAddHour,
    projectMinutes: projectMinutes,
  };
  codeAddHour = 0;
  activeAddHour = 0;
  focusAddHour = 0;
  projectAddHour = 0;
  return newObj;
}
function calculateLineOfCode(objLoc) {
  const status = localStorage.getItem("lineOfCodes");
  const items = JSON.parse(status);

  let newHtml = Number(items.locHtml) + Number(objLoc.locHtml);
  let newJs = Number(items.locJs) + Number(objLoc.locJs);
  let newCss = Number(items.locCss) + Number(objLoc.locCss);
  let allTotal = Number(items.locTotal + Number(objLoc.locTotal));

  let newObjLoc = {
    locHtml: newHtml,
    locJs: newJs,
    locCss: newCss,
    locTotal: allTotal,
  };
  return newObjLoc;
}

function getDataFormLocal(timeData, lineData) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const statusTime = localStorage.getItem("timestatus");
  const totalTime = JSON.parse(statusTime);
  const statusLines = localStorage.getItem("lineOfCodes");
  const totalLines = JSON.parse(statusLines);
  console.log(timeData, totalTime);
  console.log(lineData, totalLines);

  let html = `
  <div class="total-card-out">
   <h1> ${day}/${month}/${year}</h1>
  <div>Focus <span>:[${timeData.focusHours}hrs ${timeData.focusMinutes}min][${totalTime.focusHours}hr ${totalTime.focusMinutes}min]</span></div>
  <div>CT <span>:[${timeData.codeHours}hrs ${timeData.codeMinutes}min]</span></div>
  <div>ACT <span>:[${timeData.activeHours}hrs ${timeData.activeMinutes}min][${totalTime.activeHours}hr ${totalTime.activeMinutes}min]</span></div>
  <div>HTML <span>:[${lineData.locHtml}][${totalLines.locHtml}]</span></div>
  <div>CSS <span>:[${lineData.locCss}][${totalLines.locCss}]</span></div>
  <div>JS <span>:[${lineData.locJs}][${totalLines.locJs}]</span></div>
  <div>Total <span>:[${lineData.locTotal}][${totalLines.locTotal}]</span></div>
</div>


  `;

  output.innerHTML = html;
}
