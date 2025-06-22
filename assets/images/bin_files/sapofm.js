document.addEventListener("DOMContentLoaded", function () {
const container = document.getElementById("sapo");
const toggleButton = document.querySelector('[aria-controls="sapo"]');
const username = "lianaovn";
const apiKey = "55bfb7e506e910cc83cdc249d0b21d03";

container.innerHTML += `
<div id="music-sections" style="display: flex; flex-direction: column; gap: 15px;">
  <div id="user-profile-container" style="flex: 0 0 auto;"></div>
  <div style="display: flex; gap: 15px;">
    <div id="top-artists-container" style="flex: 0; min-width: 250px;"></div>
    <div id="recently-played-container" style="flex: 1; min-width: 250px;"></div>
  </div>
</div>
<div id="loading-state-container"></div>
`;

const userProfileContainer = document.getElementById("user-profile-container");

toggleButton.addEventListener("click", function () {
// Evita que se vuelva a disparar múltiples veces si no quieres
if (!container.dataset.loaded) {
container.dataset.loaded = "true";
showLoadingState();
}
});

function showLoadingState() {
const loadingContainer = document.getElementById("loading-state-container");
loadingContainer.innerHTML = `
<div id="loading-panel"
  style="display: flex; justify-content: center; align-items: center; height: 100%; padding: 15px; text-align: center; background-color: rgba(92, 75, 113, 0.5);">
  <div class="field-row" style="justify-content: center;">
    <img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd-0.png" width="32" alt="Music icon"
      style="margin-right: 10px;" />
    <div style="text-align:left; color: white;">
      <p style="margin-bottom: 5px; font-weight: bold;">Cargando música de Last.fm...</p>
      <progress style="width: 200px;"></progress>
      <p style="font-size: 11px; margin-top: 3px;">Espera mientras traemos el historial...</p>
    </div>
  </div>
</div>
`;

setTimeout(() => {
const loadingPanel = document.getElementById("loading-panel");
if (loadingPanel) {
loadingPanel.classList.add("fade-out");
setTimeout(() => {
loadingPanel.remove();
fetchUserProfile(userProfileContainer);
fetchTopArtistsMonth();
fetchRecentlyPlayed();
fetchTopTracksMonth();
}, 1000);
}
}, 4000); // Ajusta el tiempo si es necesario
}

function fetchUserProfile(container) {
fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`)
.then(response => response.json())
.then(data => {
if (data.error) {
throw new Error(data.message);
}
const user = data.user;
const sizes = ["extralarge", "large", "medium"];
let avatar = null;
for (let size of sizes) {
  const img = user.image.find(i => i.size === size && i["#text"]);
  if (img) {
    avatar = img["#text"];
    break;
  }
}
const scrobbles = user.playcount;
const profileUrl = user.url;

container.innerHTML = `
<div style="display: flex; align-items: center; margin-bottom: 15px;">
  <img src="${avatar}" style="width: 64px; height: 64px; border-radius: 4px; margin-right: 15px;">
  <div>
    <h3 style="margin: 0 0 5px 0; font-size: 16px;">${username}</h3>
    <p style="margin: 0; font-size: 12px; color: #666;">${scrobbles} scrobbles</p>
    <p style="margin: 5px 0 0 0; font-size: 11px;">
      <a href="${profileUrl}" target="_blank" style="color: #0000ff;">View Full Profile</a>
    </p>
  </div>
</div>
`;
})
.catch(error => {
console.error("Error fetching user data:", error);
container.innerHTML += `<p style="color: red;">Error loading user data.</p>`;
});
}

function generateTopTracksTable(tracks) {
let rowsHTML = "";
tracks.forEach((track, index) => {
const rowStyle = index % 2 === 0 ? "" : "background-color: #f0f0f0;";
rowsHTML += `
<tr style="${rowStyle}">
  <td style="padding: 4px; text-align: center; font-weight: bold;">
    ${track.rank}
  </td>
  <td style="padding: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
    <a href="${track.url}" target="_blank" style="color: #0000ff; text-decoration: none;">
      ${track.name} <span style="color: #808080; font-size: 11px;">- ${track.artist}</span>
    </a>
  </td>
  <td style="padding: 4px; text-align: right; white-space: nowrap;">
    ${track.playcount} plays
  </td>
</tr>
`;
});
return rowsHTML;
}

function fetchTopTracksMonth() {
fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&period=1month&limit=10&api_key=${apiKey}&format=json`)
.then(response => response.json())
.then(data => {
if (data.error) {
throw new Error(data.message);
}
const topTracks = data.toptracks.track.map((track, index) => ({
rank: index + 1,
name: track.name,
artist: track.artist["#text"],
url: track.url,
playcount: track.playcount
}));

const musicSections = document.getElementById("music-sections");
const topTracksContainer = document.createElement("div");
topTracksContainer.style.flex = "1";
topTracksContainer.style.minWidth = "250px";

topTracksContainer.innerHTML = `
<fieldset>
  <legend>
    <img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd-0.png" width="16" height="16"
      style="vertical-align: text-bottom; margin-right: 4px;">
    Top Tracks (Month)
  </legend>
  <div style="height: 180px; overflow-y: auto;">
    <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #c0c0c0;">
          <th style="text-align: center; padding: 4px; width: 30px;">#</th>
          <th style="text-align: left; padding: 4px;">Track</th>
          <th style="text-align: right; padding: 4px;">Plays</th>
        </tr>
      </thead>
      <tbody>
        ${generateTopTracksTable(topTracks)}
      </tbody>
    </table>
  </div>
</fieldset>
`;

if (musicSections) {
musicSections.appendChild(topTracksContainer);
}
})
.catch(error => {
console.error("Error fetching top tracks:", error);
const container = document.getElementById("top-artists-container");
container.innerHTML += `<p style="color: red;">Error loading top tracks.</p>`;
});
}

function fetchTopArtistsMonth() {
fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&period=1month&limit=10&api_key=${apiKey}&format=json`)
.then(response => response.json())
.then(data => {
const topArtists = data.topartists.artist.map((artist, index) => ({
rank: index + 1,
name: artist.name,
url: artist.url,
playcount: artist.playcount
}));

const container = document.getElementById("top-artists-container");
container.innerHTML = `
<fieldset>
  <legend>
    <img src="https://win98icons.alexmeub.com/icons/png/directory_favorites-5.png" width="16" height="16"
      style="vertical-align: text-bottom; margin-right: 4px;">
    Top Artists (Month)
  </legend>
  <div style="height: 180px; overflow-y: auto;">
    <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #c0c0c0;">
          <th style="text-align: center; padding: 4px; width: 30px;">#</th>
          <th style="text-align: left; padding: 4px;">Artist</th>
          <th style="text-align: right; padding: 4px;">Plays</th>
        </tr>
      </thead>
      <tbody>
        ${topArtists.map(artist =>
        `<tr style="${artist.rank % 2 === 0 ? 'background-color: #f0f0f0;' : ''}">
          <td style="padding: 4px; text-align: center; font-weight: bold;">${artist.rank}</td>
          <td style="padding: 4px;">
            <a href="${artist.url}" target="_blank" style="color: #0000ff;">${artist.name}</a>
          </td>
          <td style="padding: 4px; text-align: right;">${artist.playcount}</td>
        </tr>`
        ).join("")}
      </tbody>
    </table>
  </div>
</fieldset>
`;
})
.catch(error => {
console.error("Error fetching top artists:", error);
const container = document.getElementById("top-artists-container");
container.innerHTML += `<p style="color: red;">Error loading top artists.</p>`;
});
}

function fetchRecentlyPlayed() {
fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&limit=10&api_key=${apiKey}&format=json`)
.then(response => response.json())
.then(data => {
const now = Date.now();

const recentTracks = data.recenttracks.track.map(track => {
const name = track.name || "Unknown Title";
const artist = track.artist?.["#text"] || "Unknown Artist";
const url = track.url || "#";

let time = "Now playing";
if (track.date && track.date.uts) {
const trackTime = parseInt(track.date.uts, 10) * 1000;
const diff = Math.floor((now - trackTime) / 1000);
if (diff < 60) { time=`${diff} second${diff !==1 ? "s" : "" } ago`; } else if (diff < 3600) { const
  minutes=Math.floor(diff / 60); time=`${minutes} minute${minutes !==1 ? "s" : "" } ago`; } else if (diff < 86400) {
  const hours=Math.floor(diff / 3600); time=`${hours} hour${hours !==1 ? "s" : "" } ago`; } else { const
  days=Math.floor(diff / 86400); time=`${days} day${days !==1 ? "s" : "" } ago`; } } return { name, artist, url, time };
  }); const recentlyPlayedContainer=document.getElementById("recently-played-container");
  recentlyPlayedContainer.innerHTML=` <fieldset>
  <legend>
    <img src="https://win98icons.alexmeub.com/icons/png/media_player-0.png" width="16" height="16"
      style="vertical-align: text-bottom; margin-right: 4px;">
    Recently Played
  </legend>
  <div style="height: 180px; overflow-y: auto;">
    <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #c0c0c0;">
          <th style="text-align: left; padding: 4px;">Track</th>
          <th style="text-align: left; padding: 4px;">Artist</th>
          <th style="text-align: right; padding: 4px;">Time</th>
        </tr>
      </thead>
      <tbody>
        ${generateRecentlyPlayedTable(recentTracks)}
      </tbody>
    </table>
  </div>
  </fieldset>
  `;
  })
  .catch(error => {
  console.error("Error fetching recent tracks:", error);
  const recentlyPlayedContainer = document.getElementById("recently-played-container");
  recentlyPlayedContainer.innerHTML += `<p style="color: red;">Error loading recent tracks.</p>`;
  });
  }

  function generateRecentlyPlayedTable(tracks) {
  return tracks.map((track, index) => {
  const rowStyle = index % 2 === 0 ? "" : "background-color: #f0f0f0;";
  return `
  <tr style="${rowStyle}">
    <td style="padding: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
      <a href="${track.url}" target="_blank" style="color: #0000ff; text-decoration: none;">
        ${track.name}
      </a>
    </td>
    <td style="padding: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">
      ${track.artist}
    </td>
    <td style="padding: 4px; text-align: right; white-space: nowrap; color: #808080;">
      ${track.time}
    </td>
  </tr>
  `;
  }).join('');
  }});
