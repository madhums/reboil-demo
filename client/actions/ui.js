export const API_ERROR = 'API_ERROR';
export const DISMISS_ERRORS = 'DISMISS_ERRORS';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export function dismissErrors() {
  return { type: DISMISS_ERRORS };
}

export function changeLanguage(lang) {
  return { type: CHANGE_LANGUAGE, lang };
}
