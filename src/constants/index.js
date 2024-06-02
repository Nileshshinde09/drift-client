const STRICKTMODE = true
const IMAGE_POST_MAX_FILES = 3;
const IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png'];
const VIDEO_POST_MAX_FILES = 1;
const VIDEO_ALLOWED_TYPES = ['audio/mpeg'];
import { TEAM } from "./team";
const VITE_HOST_URL= String(import.meta.env.VITE_HOST_URL)

import ANIMATED_3D_404_NOT_FOUND_PAGE_ERROR_V1 from "../assets/StatusCodeGifs/animated-3D-404-not-found-page-error.gif"
import ANIMATED_CHARACTER_AT_THE_DESK_FOR_UNDER_MAINTENANCE_ERROR_PAGE_v1 from "../assets/StatusCodeGifs/animated-character-at-the-desk-for-under-maintenance-error-page.gif"
import ANIMATED_TURTLE_IN_TROUBL_ERROR_PAGE_V1 from "../assets/StatusCodeGifs/animated-turtle-in-trouble-error-page.gif"
import ELECTROCUTED_CAVEMAN_ANIMATION_404_ERROR_PAGE_V2 from "../assets/StatusCodeGifs/electrocuted-caveman-animation-404-error-page.gif"
import MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3 from "../assets/StatusCodeGifs/mario-game-animation-404--error-page.gif"
import SERVER_ON_FIRE_ERROR_PAGE_ANIMATION_V1 from "../assets/StatusCodeGifs/server-on-fire-error-page-animation.gif"
import SHORT_CIRCUIT_ANIMATED_500_ERROR_PAGE_V1 from "../assets/StatusCodeGifs/short-circuit-animated-500-error-page.gif"

const PROFILE_DUMMY_IMAGE_URL = "https://res.cloudinary.com/db3pdtxym/image/upload/v1716473340/in3fbtrbipkz9glmtui0.webp"
const TAGLIST = [
  // General
  "announcement",
  "update",
  "news",

  // Personal
  "life",
  "family",
  "friends",
  "selfie",
  "travel",
  "vacation",
  "food",
  "health",
  "fitness",
  "motivation",

  // Entertainment
  "music",
  "movies",
  "tv",
  "books",
  "gaming",
  "sports",

  // Technology
  "tech",
  "gadgets",
  "programming",
  "coding",
  "software",
  "hardware",

  // Education
  "learning",
  "school",
  "college",
  "university",
  "onlineCourse",

  // Work
  "career",
  "job",
  "business",
  "entrepreneur",
  "startup",

  // Hobbies
  "art",
  "photography",
  "crafts",
  "cooking",
  "gardening",
  "music",

  // Social Causes
  "charity",
  "volunteering",
  "environment",
  "activism",

  // Miscellaneous
  "funny",
  "memes",
  "quotes",
  "inspiration",
  "events",
  "celebration"
];
export {
  TEAM,
  VITE_HOST_URL,
  ANIMATED_3D_404_NOT_FOUND_PAGE_ERROR_V1,
  ANIMATED_CHARACTER_AT_THE_DESK_FOR_UNDER_MAINTENANCE_ERROR_PAGE_v1,
  ANIMATED_TURTLE_IN_TROUBL_ERROR_PAGE_V1,
  ELECTROCUTED_CAVEMAN_ANIMATION_404_ERROR_PAGE_V2,
  MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3,
  SERVER_ON_FIRE_ERROR_PAGE_ANIMATION_V1,
  SHORT_CIRCUIT_ANIMATED_500_ERROR_PAGE_V1,
  STRICKTMODE,
  TAGLIST,
  IMAGE_POST_MAX_FILES,
  IMAGE_ALLOWED_TYPES,
  VIDEO_POST_MAX_FILES,
  VIDEO_ALLOWED_TYPES,
  PROFILE_DUMMY_IMAGE_URL
} 