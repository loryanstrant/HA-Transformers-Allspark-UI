import './status-card.js';
import './sensor-card.js';
import './button-card.js';
import './text-card.js';
import './gauge-card.js';
import './clock-card.js';
import './glance-card.js';
import './light-card.js';
import './picture-card.js';
import './weather-card.js';
import './alarm-card.js';
import './background-card.js';
import './editor.js';

const registerCard = (definition) => {
  window.customCards = window.customCards || [];
  if (!window.customCards.some((card) => card.type === definition.type)) {
    window.customCards.push(definition);
  }
};

[
  {
    type: 'transformers-status-card',
    name: 'Transformers Status Card',
    description: 'Display multiple entities with dynamic Transformers-style status indicators.',
    preview: true,
  },
  {
    type: 'transformers-sensor-card',
    name: 'Transformers Sensor Card',
    description: 'Display a single sensor with optional progress visualization.',
    preview: true,
  },
  {
    type: 'transformers-button-card',
    name: 'Transformers Button Card',
    description: 'Control entities and services with Home Assistant-driven icons and states.',
    preview: true,
  },
  {
    type: 'transformers-text-card',
    name: 'Transformers Text Card',
    description: 'Display static or entity-driven text in a Transformers terminal style.',
    preview: true,
  },
  {
    type: 'transformers-gauge-card',
    name: 'Transformers Gauge Card',
    description: 'Display numeric sensor values in a circular Transformers gauge.',
    preview: true,
  },
  {
    type: 'transformers-clock-card',
    name: 'Transformers Clock Card',
    description: 'Display current time and date with G1 or Movie typography.',
    preview: true,
  },
  {
    type: 'transformers-glance-card',
    name: 'Transformers Glance Card',
    description: 'Show multiple entity states with dynamic Home Assistant icons.',
    preview: true,
  },
  {
    type: 'transformers-light-card',
    name: 'Transformers Light Card',
    description: 'Control a light with dynamic icon, state, and brightness handling.',
    preview: true,
    getEntitySuggestion: (_hass, entityId) =>
      typeof entityId === 'string' && entityId.startsWith('light.')
        ? { config: { type: 'custom:transformers-light-card', entity: entityId } }
        : null,
  },
  {
    type: 'transformers-picture-card',
    name: 'Transformers Picture Card',
    description: 'Display images or camera feeds with Transformers-inspired styling.',
    preview: true,
    getEntitySuggestion: (_hass, entityId) =>
      typeof entityId === 'string' && entityId.startsWith('camera.')
        ? { config: { type: 'custom:transformers-picture-card', entity: entityId } }
        : null,
  },
  {
    type: 'transformers-weather-card',
    name: 'Transformers Weather Card',
    description: 'Display current conditions and forecast with Home Assistant-driven weather icons.',
    preview: true,
    getEntitySuggestion: (_hass, entityId) =>
      typeof entityId === 'string' && entityId.startsWith('weather.')
        ? { config: { type: 'custom:transformers-weather-card', entity: entityId } }
        : null,
  },
  {
    type: 'transformers-alarm-card',
    name: 'Transformers Alarm Card',
    description: 'Control alarm panels with dynamic state styling and keypad input.',
    preview: true,
  },
  {
    type: 'transformers-background-card',
    name: 'Transformers Background Card',
    description: 'A full-area Transformers backdrop (frame + optional title) to sit behind other cards.',
    preview: true,
  },
].forEach(registerCard);

console.info(
  '%c TRANSFORMERS ALLSPARK UI %c v0.4.1 ',
  'color: #e31e24; background: #000; font-weight: bold;',
  'color: #000; background: #e31e24; font-weight: bold;'
);