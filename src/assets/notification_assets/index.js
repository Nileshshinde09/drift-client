// Import images
export const images = import.meta.glob('./images/*.{png,jpg,jpeg,svg}', { eager: true });
// Import audio files from different categories
export const audios_birthday = import.meta.glob('./music/birthday/*.{mp3,wav}', { eager: true });
export const audios_bollywood = import.meta.glob('./music/bollywood/*.{mp3,wav}', { eager: true });
export const audios_jarvis = import.meta.glob('./music/jarvis/*.{mp3,wav}', { eager: true });
export const audios_professional = import.meta.glob('./music/professional/*.{mp3,wav}', { eager: true });
export const audios_rap = import.meta.glob('./music/rap/*.{mp3,wav}', { eager: true });

// Convert imported assets to usable format
function convertGlobToAssets(glob) {
  const assets = {};
  for (const path in glob) {
    const key = path.replace('./', '');
    assets[key] = glob[path].default || glob[path];
  }
  return assets;
}

// Export loaded assets
export const loadedImages = convertGlobToAssets(images);
export const loadedAudiosBirthday = convertGlobToAssets(audios_birthday);
export const loadedAudiosBollywood = convertGlobToAssets(audios_bollywood);
export const loadedAudiosJarvis = convertGlobToAssets(audios_jarvis);
export const loadedAudiosProfessional = convertGlobToAssets(audios_professional);
export const loadedAudiosRap = convertGlobToAssets(audios_rap);
    