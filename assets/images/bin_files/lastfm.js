// Last.fm integration 
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize the Last.fm functionality when the music tab is active
  const musicTab = document.querySelector('button[aria-controls="food"]');
  const musicPanel = document.getElementById('food');
  
  if (!musicTab || !musicPanel) return;
  
  // Flag to track if we've already initialized
  let initialized = false;
  
  // Function to initialize Last.fm data loading
  function initializeLastFm() {
    if (initialized) return;
    initialized = true;
    
    loadLastFmData();
  }
  
  // Initialize when the music tab is clicked
  musicTab.addEventListener('click', function() {
    initializeLastFm();
  });
  
  // Also initialize if the music tab is already selected on page load
  if (musicTab.getAttribute('aria-selected') === 'true') {
    initializeLastFm();
  }
  
  // Main function to load Last.fm data
  async function loadLastFmData() {
    // Show loading state
    showLoadingState();
    
    try {
      // Fetch data from our API endpoint
      const response = await fetch('/api/lastfm');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Last.fm data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Update the UI with the data
      updateLastFmUI(data);
    } catch (error) {
      console.error('Error loading Last.fm data:', error);
      showErrorState(error.message);
    }
  }
  
  // Show loading state in the UI
  function showLoadingState() {
    musicPanel.innerHTML = `
      <div style="padding: 15px; text-align: center;">
        <div class="field-row" style="justify-content: center;">
          <img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd-0.png" width="32" alt="Music icon" style="margin-right: 10px;"/>
          <div style="text-align:left;">
            <p style="margin-bottom: 5px; font-weight: bold;">Loading music data from Last.fm...</p>
            <progress style="width: 200px;"></progress>
            <p style="font-size: 11px; margin-top: 3px;">Please wait while we retrieve your music history...</p>
          </div>
        </div>
      </div>
    `;
  }
  
  // Show error state in the UI
  function showErrorState(errorMessage) {
    musicPanel.innerHTML = `
      <div style="padding: 15px; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center;">
          <img src="https://win98icons.alexmeub.com/icons/png/error_14-0.png" width="32" alt="Error icon" style="margin-right: 10px;"/>
          <div style="text-align:left;">
            <p style="margin-bottom: 5px; color: #cf0000; font-weight: bold;">Error loading music data</p>
            <p style="font-size: 12px;">${errorMessage || 'Unknown error'}</p>
            <button onclick="location.reload()">Try Again</button>
          </div>
        </div>
        
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #c0c0c0;">
          <p style="font-size: 12px;">Displaying fallback content:</p>
          <p style="font-size: 14px; margin-top: 10px;">
            <b>Most recent set:</b>
            <a href="https://soundcloud.com/vmfunc/vmfunc-eos-popup-2">vmfunc @ EOS::2</a>
          </p>
          <!-- Fallback content here -->
        </div>
      </div>
    `;
  }
  
  // Update UI with Last.fm data
  function updateLastFmUI(data) {
    if (!data || !data.recentTracks || !data.topTracks || !data.topArtists) {
      showErrorState('Invalid data format from Last.fm API');
      return;
    }
    
    // Format the scrobble count with commas
    const scrobbleCount = data.userInfo?.playcount ? 
      parseInt(data.userInfo.playcount).toLocaleString() : 'N/A';
    
    // Create the UI structure
    let html = `
      <div>
        <!-- Username and scrobble info -->
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          <img src="${data.userInfo?.image?.[2]?.['#text'] || 'https://win98icons.alexmeub.com/icons/png/user-0.png'}" 
               style="width: 64px; height: 64px; border-radius: 4px; margin-right: 15px;">
          <div>
            <h3 style="margin: 0 0 5px 0; font-size: 16px;">vmfunc</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">
              ${scrobbleCount} scrobbles
            </p>
            <p style="margin: 5px 0 0 0; font-size: 11px;">
              <a href="https://www.last.fm/user/vmfunc" target="_blank" style="color: #0000ff;">View Full Profile</a>
            </p>
          </div>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
          <!-- Recently Played -->
          <div style="flex: 1; min-width: 250px;">
            <fieldset>
              <legend>
                <img src="https://win98icons.alexmeub.com/icons/png/media_player-0.png" width="16" height="16" style="vertical-align: text-bottom; margin-right: 4px;">
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
    `;
    
    // Add recent tracks
    if (data.recentTracks && data.recentTracks.length > 0) {
      data.recentTracks.forEach((track, index) => {
        // Check if track is currently playing
        const isNowPlaying = track['@attr']?.nowplaying === 'true';
        
        // Format timestamp or show "Now Playing"
        let timestamp = 'Unknown time';
        if (isNowPlaying) {
          timestamp = 'Now Playing';
        } else if (track.date?.['#text']) {
          // Convert Last.fm date format to relative time
          const trackDate = new Date(track.date['#text']);
          timestamp = formatRelativeTime(trackDate);
        }
        
        html += `
          <tr style="${index % 2 === 0 ? '' : 'background-color: #f0f0f0;'} ${isNowPlaying ? 'font-weight: bold; background-color: #e6ffe6;' : ''}">
            <td style="padding: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
              <a href="${track.url}" target="_blank" style="color: ${isNowPlaying ? '#008000' : '#0000ff'}; text-decoration: none;">
                ${isNowPlaying ? '► ' : ''}${track.name || 'Unknown'}
              </a>
            </td>
            <td style="padding: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">
              ${track.artist?.['#text'] || 'Unknown Artist'}
            </td>
            <td style="padding: 4px; text-align: right; white-space: nowrap; color: ${isNowPlaying ? '#008000' : '#808080'};">
              ${timestamp}
            </td>
          </tr>
        `;
      });
    } else {
      html += `
        <tr>
          <td colspan="3" style="padding: 8px; text-align: center;">No recent tracks found</td>
        </tr>
      `;
    }
    
    html += `
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>
          
          <!-- Top Artists -->
          <div style="flex: 1; min-width: 250px;">
            <fieldset>
              <legend>
                <img src="https://win98icons.alexmeub.com/icons/png/directory_favorites-5.png" width="16" height="16" style="vertical-align: text-bottom; margin-right: 4px;">
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
    `;
    
    // Add top artists
    if (data.topArtists && data.topArtists.length > 0) {
      data.topArtists.forEach((artist, index) => {
        html += `
          <tr style="${index % 2 === 0 ? '' : 'background-color: #f0f0f0;'}">
            <td style="padding: 4px; text-align: center; font-weight: bold;">${index + 1}</td>
            <td style="padding: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
              <a href="${artist.url}" target="_blank" style="color: #0000ff; text-decoration: none;">
                ${artist.name}
              </a>
            </td>
            <td style="padding: 4px; text-align: right; white-space: nowrap;">
              ${parseInt(artist.playcount).toLocaleString()} plays
            </td>
          </tr>
        `;
      });
    } else {
      html += `
        <tr>
          <td colspan="3" style="padding: 8px; text-align: center;">No top artists found</td>
        </tr>
      `;
    }
    
    html += `
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>
          
          <!-- Top Tracks -->
          <div style="flex: 1; min-width: 250px;">
            <fieldset>
              <legend>
                <img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd-0.png" width="16" height="16" style="vertical-align: text-bottom; margin-right: 4px;">
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
    `;
    
    // Add top tracks
    if (data.topTracks && data.topTracks.length > 0) {
      data.topTracks.forEach((track, index) => {
        html += `
          <tr style="${index % 2 === 0 ? '' : 'background-color: #f0f0f0;'}">
            <td style="padding: 4px; text-align: center; font-weight: bold;">${index + 1}</td>
            <td style="padding: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
              <a href="${track.url}" target="_blank" style="color: #0000ff; text-decoration: none;">
                ${track.name || 'Unknown'} <span style="color: #808080; font-size: 11px;">- ${track.artist?.name || 'Unknown Artist'}</span>
              </a>
            </td>
            <td style="padding: 4px; text-align: right; white-space: nowrap;">
              ${parseInt(track.playcount).toLocaleString()} plays
            </td>
          </tr>
        `;
      });
    } else {
      html += `
        <tr>
          <td colspan="3" style="padding: 8px; text-align: center;">No top tracks found</td>
        </tr>
      `;
    }
    
    html += `
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    `;
    
    // Update the music panel with our HTML
    musicPanel.innerHTML = html;
  }
  
  // Helper function to format relative time
  function formatRelativeTime(date) {
    if (!date || isNaN(date)) return 'Unknown time';
    
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSec < 60) {
      return 'Just now';
    } else if (diffMin < 60) {
      return `${diffMin}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      // Format as MM/DD/YY
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString().substr(-2)}`;
    }
  }
  
  // Helper function to calculate daily average scrobbles
  function calculateDailyAverage(registeredTimestamp, playcount) {
    if (!registeredTimestamp || !playcount) return 'Unknown';
    
    const registerDate = new Date(parseInt(registeredTimestamp) * 1000);
    const now = new Date();
    const daysSinceRegister = Math.ceil((now - registerDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceRegister <= 0) return 'Unknown';
    
    const average = parseInt(playcount) / daysSinceRegister;
    return average.toFixed(1) + ' scrobbles/day';
  }
}); 