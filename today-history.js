/*
=========================================================
 IMOLE 2027 — AUTOMATIC TODAY IN HISTORY
 Hon. Nurudeen Abayomi Sadeeq
=========================================================
*/

(function(){

"use strict";


/* -------------------------------------------------------
   SETTINGS
------------------------------------------------------- */

const API_BASE =
"https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all";


const CACHE_PREFIX =
"imole_today_history_";


/* -------------------------------------------------------
   DATE
------------------------------------------------------- */

function getToday(){

const now = new Date();

return {
  month:String(now.getMonth()+1).padStart(2,"0"),
  day:String(now.getDate()).padStart(2,"0"),
  key:
    String(now.getMonth()+1).padStart(2,"0")
    +
    "-"
    +
    String(now.getDate()).padStart(2,"0")
};

}


function getFormattedDate(){

return new Intl.DateTimeFormat(
"en-NG",
{
  weekday:"long",
  year:"numeric",
  month:"long",
  day:"numeric"
}
).format(new Date());

}


/* -------------------------------------------------------
   HTML SECURITY
------------------------------------------------------- */

function escapeHTML(value){

if(value===null || value===undefined){
return "";
}

return String(value)
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;")
.replace(/'/g,"&#039;");

}


/* -------------------------------------------------------
   GET PAGE INFORMATION
------------------------------------------------------- */

function getPage(item){

if(
item &&
item.pages &&
item.pages.length
){

const page=item.pages[0];

let url="";

if(
page.content_urls &&
page.content_urls.desktop &&
page.content_urls.desktop.page
){

url=
page.content_urls.desktop.page;

}

let image="";

if(
page.thumbnail &&
page.thumbnail.source
){

image=
page.thumbnail.source;

}

if(
!image &&
page.originalimage &&
page.originalimage.source
){

image=
page.originalimage.source;

}

return {
  title:page.title || "",
  description:page.description || "",
  url:url,
  image:image
};

}

return {
  title:"",
  description:"",
  url:"",
  image:""
};

}


/* -------------------------------------------------------
   CARD
------------------------------------------------------- */

function createCard(item,type){

const page=getPage(item);

const year=
item.year ||
"";

const text=
item.text ||
item.extract ||
item.description ||
page.description ||
page.title ||
"Historical information for this date.";


let imageHTML="";

if(page.image){

imageHTML=`
<img
  class="history-image"
  src="${escapeHTML(page.image)}"
  alt=""
  loading="lazy"
  onerror="this.style.display='none'"
>
`;

}

let linkHTML="";

if(page.url){

linkHTML=`
<a
  class="read-more"
  href="${escapeHTML(page.url)}"
  target="_blank"
  rel="noopener noreferrer"
>
Read more →
</a>
`;

}

return `
<article class="history-card">

${imageHTML}

<div class="history-body">

${
year
?
`<span class="year">${escapeHTML(year)}</span>`
:
""
}

<h3>
${escapeHTML(text)}
</h3>

${
page.description
?
`<p>${escapeHTML(page.description)}</p>`
:
""
}

${linkHTML}

</div>

</article>
`;

}


/* -------------------------------------------------------
   RENDER
------------------------------------------------------- */

function renderCards(
containerId,
statusId,
items,
type,
limit
){

const container=
document.getElementById(containerId);

const status=
document.getElementById(statusId);

if(!container){
return;
}

if(!Array.isArray(items)){
items=[];
}

const selected=
items.slice(0,limit);


if(selected.length===0){

if(status){

status.innerHTML=`
<strong>
No entries found
</strong>

There is no historical information available
for this category today.
`;

status.style.display="block";

}

container.style.display="none";

return;

}


container.innerHTML=
selected
.map(item=>createCard(item,type))
.join("");

container.style.display="grid";

if(status){
status.style.display="none";
}

}


/* -------------------------------------------------------
   STATUS ERROR
------------------------------------------------------- */

function showError(
statusId,
message
){

const status=
document.getElementById(statusId);

if(!status){
return;
}

status.style.display="block";

status.innerHTML=`
<strong>
Unable to load today's history
</strong>

${escapeHTML(message)}

<br><br>

<button
  onclick="location.reload()"
  style="
    border:0;
    background:#d6a62e;
    color:#10231d;
    padding:10px 16px;
    border-radius:8px;
    font-weight:900;
    cursor:pointer;
  "
>
Try Again
</button>
`;

}


/* -------------------------------------------------------
   CACHE
------------------------------------------------------- */

function getCache(key){

try{

const raw=
sessionStorage.getItem(
CACHE_PREFIX+key
);

if(!raw){
return null;
}

return JSON.parse(raw);

}catch(error){

return null;

}

}


function setCache(key,data){

try{

sessionStorage.setItem(
CACHE_PREFIX+key,
JSON.stringify(data)
);

}catch(error){

/* Ignore storage errors */

}

}


/* -------------------------------------------------------
   LOAD DATA
------------------------------------------------------- */

async function loadTodayHistory(){

const today=
getToday();

const endpoint=
`${API_BASE}/${today.month}/${today.day}`;


/* Update date */

const dateElements=[
document.getElementById("todayDate"),
document.getElementById("homeHistoryDate")
];

dateElements.forEach(el=>{

if(el){
el.textContent=
getFormattedDate();
}

});


/* Check cache */

const cached=
getCache(today.key);

if(cached){

renderAll(cached);

return;

}


try{

const response=
await fetch(
endpoint,
{
  method:"GET",
  headers:{
    "Accept":"application/json"
  },
  cache:"no-store"
}
);


if(!response.ok){

throw new Error(
"History service returned an error."
);

}


const data=
await response.json();


setCache(
today.key,
data
);


renderAll(data);


}catch(error){

console.error(
"Today in History error:",
error
);


/* Full page */

showError(
"eventsStatus",
"Please check your internet connection and try again."
);

showError(
"birthsStatus",
"Please check your internet connection and try again."
);

showError(
"deathsStatus",
"Please check your internet connection and try again."
);


/* Homepage */

const homeStatus=
document.getElementById(
"homeHistoryStatus"
);

if(homeStatus){

homeStatus.innerHTML=`
<strong>
Today's history is temporarily unavailable
</strong>

Please refresh the page and try again.
`;

}

}

}


/* -------------------------------------------------------
   RENDER ALL
------------------------------------------------------- */

function renderAll(data){

if(!data){
return;
}


const events=
Array.isArray(data.events)
?
data.events
:
[];


const births=
Array.isArray(data.births)
?
data.births
:
[];


const deaths=
Array.isArray(data.deaths)
?
data.deaths
:
[];


/* Full Today page */

renderCards(
"events",
"eventsStatus",
events,
"event",
9
);

renderCards(
"births",
"birthsStatus",
births,
"birth",
6
);

renderCards(
"deaths",
"deathsStatus",
deaths,
"death",
6
);


/* Homepage */

const homeContainer=
document.getElementById(
"homeHistoryEvents"
);

const homeStatus=
document.getElementById(
"homeHistoryStatus"
);

if(homeContainer){

const featured=
events.slice(0,3);

if(featured.length){

homeContainer.innerHTML=
featured
.map(item=>createCard(item,"event"))
.join("");

homeContainer.style.display="grid";

if(homeStatus){
homeStatus.style.display="none";
}

}else{

if(homeStatus){

homeStatus.innerHTML=`
<strong>
No historical events found for today
</strong>

Visit the Today in History page for more information.
`;

}

}

}

}


/* -------------------------------------------------------
   AUTOMATIC MIDNIGHT REFRESH
------------------------------------------------------- */

function scheduleMidnightRefresh(){

const now=
new Date();

const next=
new Date();

next.setHours(24,0,0,0);

const delay=
next.getTime()-now.getTime()+2000;

setTimeout(()=>{

location.reload();

},delay);

}


/* -------------------------------------------------------
   START
------------------------------------------------------- */

function init(){

loadTodayHistory();

scheduleMidnightRefresh();

}


/* Wait for page */

if(
document.readyState==="loading"
){

document.addEventListener(
"DOMContentLoaded",
init
);

}else{

init();

}

})();
