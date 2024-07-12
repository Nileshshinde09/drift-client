
const VITE_HOST_URL = String(import.meta.env.VITE_HOST_URL)
const VITE_SERVER_SOCKET_HOST_URL = String(import.meta.env.VITE_SERVER_SOCKET_HOST_URL)

const STRICKTMODE = true
const IMAGE_POST_MAX_FILES = 3;
const IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png'];
const VIDEO_POST_MAX_FILES = 1;
const VIDEO_ALLOWED_TYPES = ['audio/mpeg'];

const musicDirPath = '../assets/notifications/music'
try {
  const PRESENT_GENER_NAME = await fetch(musicDirPath);
  console.log(PRESENT_GENER_NAME);
} catch (err) {
  console.error('Error reading directory:', err);
}

import { TEAM } from "./team";
import ANIMATED_3D_404_NOT_FOUND_PAGE_ERROR_V1 from "../assets/StatusCodeGifs/animated-3D-404-not-found-page-error.gif"
import ANIMATED_CHARACTER_AT_THE_DESK_FOR_UNDER_MAINTENANCE_ERROR_PAGE_v1 from "../assets/StatusCodeGifs/animated-character-at-the-desk-for-under-maintenance-error-page.gif"
import ANIMATED_TURTLE_IN_TROUBL_ERROR_PAGE_V1 from "../assets/StatusCodeGifs/animated-turtle-in-trouble-error-page.gif"
import ELECTROCUTED_CAVEMAN_ANIMATION_404_ERROR_PAGE_V2 from "../assets/StatusCodeGifs/electrocuted-caveman-animation-404-error-page.gif"
import MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3 from "../assets/StatusCodeGifs/mario-game-animation-404--error-page.gif"
import SERVER_ON_FIRE_ERROR_PAGE_ANIMATION_V1 from "../assets/StatusCodeGifs/server-on-fire-error-page-animation.gif"
import SHORT_CIRCUIT_ANIMATED_500_ERROR_PAGE_V1 from "../assets/StatusCodeGifs/short-circuit-animated-500-error-page.gif"
import { object } from "zod";
export const ChatEventEnum = Object.freeze({
  // ? once user is ready to go
  CONNECTED_EVENT: "connected",
  // ? when user gets disconnected
  DISCONNECT_EVENT: "disconnect",
  // ? when user joins a socket room
  JOIN_CHAT_EVENT: "joinChat",
  // ? when participant gets removed from group, chat gets deleted or leaves a group
  LEAVE_CHAT_EVENT: "leaveChat",
  // ? when admin updates a group name
  UPDATE_GROUP_NAME_EVENT: "updateGroupName",
  // ? when new message is received
  MESSAGE_RECEIVED_EVENT: "messageReceived",
  // ? when there is new one on one chat, new group chat or user gets added in the group
  NEW_CHAT_EVENT: "newChat",
  // ? when there is an error in socket
  SOCKET_ERROR_EVENT: "socketError",
  // ? when participant stops typing
  STOP_TYPING_EVENT: "stopTyping",
  // ? when participant starts typing
  TYPING_EVENT: "typing",
  // ? when message is deleted
  MESSAGE_DELETE_EVENT: "messageDeleted",
});
export const AvailableChatEvents = Object.values(ChatEventEnum);
const MESSANGER_THEME_ENUM = Object.freeze({
  DEFAULT: "shadow-gray-500",
})
const MESSANGER_THEME = Object.values("shadow-gray-500")
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
  MESSANGER_THEME_ENUM,
  MESSANGER_THEME,
  VITE_HOST_URL,
  VITE_SERVER_SOCKET_HOST_URL,
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