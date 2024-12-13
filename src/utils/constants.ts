export const APP_NAME = 'NelsonBot';

export const CHAT_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 2000,
  MAX_MESSAGES_DISPLAYED: 50,
  TYPING_INDICATOR_DELAY: 1000,
  MESSAGE_TYPES: {
    USER: 'user',
    BOT: 'bot',
    SYSTEM: 'system'
  }
} as const;

export const ROUTES = {
  HOME: '/',
  RESOURCES: '/resources',
  SETTINGS: '/settings',
  HELP: '/help'
} as const;

export const THEME = {
  colors: {
    primary: '#0A4DA6',
    secondary: '#60A5FA',
    accent: '#E0F2FE'
  }
} as const;