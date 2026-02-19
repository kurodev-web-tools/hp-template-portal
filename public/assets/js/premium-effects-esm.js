/**
 * Premium Effects Loader
 * Module-based entry point for effects used in the HP Portal.
 */

import { BlurText } from './effects/blur-text.js';
import { Hyperspeed } from './effects/hyperspeed.js';
import { Aurora } from './effects/aurora.js';
import { Spotlight } from './effects/spotlight.js';

// Global export for non-module script support if needed
window.PremiumEffects = {
    BlurText,
    Hyperspeed,
    Aurora,
    Spotlight
};

export {
    BlurText,
    Hyperspeed,
    Aurora,
    Spotlight
};
