export const PROJECT_STATUS = {
  'ORDERED': 'ordered',
  'HOLD': 'hold',
  'BLOCKER': 'blocker'
};

const i18n = {};
const addTranslation = (language, key, value) => {
  if(!i18n[language]) {
    i18n[language] = {};
  }

  i18n[language][key] = value;
};

addTranslation('en', PROJECT_STATUS.ORDERED, 'Ordered');
addTranslation('en', PROJECT_STATUS.HOLD, 'On Hold');
addTranslation('en', PROJECT_STATUS.BLOCKER, 'Blocker');

export const getProjectStatusTranslation = (key, language = 'en') => {
  if(!i18n[language] || !i18n[language][key]) {
    return `Unknown project status translation for key = "${key}" and language = ${language}`;
  }
  return i18n[language][key];
};
