const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const TEMPLATE = path.join(__dirname, '..', 'public', 'templates', 'streamer', 'a', 'index.html');
const STYLE = path.join(__dirname, '..', 'public', 'templates', 'streamer', 'a', 'assets', 'css', 'style.css');
const SCRIPT = path.join(__dirname, '..', 'public', 'templates', 'streamer', 'a', 'assets', 'js', 'script.js');
const html = fs.readFileSync(TEMPLATE, 'utf8');
const css = fs.readFileSync(STYLE, 'utf8');
const script = fs.readFileSync(SCRIPT, 'utf8');

function run(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

run('streamer a renewal exposes six depth-scroll sections in the designed order', () => {
  const ids = ['depth-hero', 'world', 'profile', 'schedule', 'archives', 'community'];
  let lastIndex = -1;

  for (const id of ids) {
    const marker = `id="${id}"`;
    const index = html.indexOf(marker);
    assert.notEqual(index, -1, `missing ${marker}`);
    assert.ok(index > lastIndex, `${id} should appear after previous section`);
    lastIndex = index;
  }
});

run('streamer a renewal includes the approved deep-sea positioning copy', () => {
  assert.match(html, /VIRTUAL DEEP SEA/);
  assert.match(html, /潜航ログ/);
  assert.match(html, /次回潜航/);
  assert.match(html, /観測アーカイブ/);
  assert.match(html, /コミュニティ海域/);
});

run('streamer a renewal ships explicit participation CTAs and no generic contact placeholders', () => {
  assert.match(html, />待機所へ潜航する</);
  assert.match(html, />配信通知を受け取る</);
  assert.match(html, /placeholder="依頼名 \/ Channel \/ Crew"/);
  assert.match(html, /placeholder="contact@abyssal-link\.jp"/);
  assert.doesNotMatch(html, /placeholder="配信名 \/ Handle"/);
  assert.doesNotMatch(html, /placeholder="contact@neon-grid\.jp"/);
});

run('streamer a renewal uses a fixed-camera depth viewport on desktop with mobile fallback', () => {
  assert.match(html, /<div class="depth-viewport">/);
  assert.match(html, /<div class="depth-track" aria-hidden="true"><\/div>/);
  assert.match(css, /@media \(min-width: 861px\) \{[\s\S]*\.depth-viewport\s*\{[\s\S]*position:\s*sticky;/);
  assert.match(css, /@media \(min-width: 861px\) \{[\s\S]*\.depth-track\s*\{[\s\S]*height:\s*620svh;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*\.depth-viewport\s*\{[\s\S]*position:\s*relative;/);
});

run('streamer a renewal loads three.js depth stage in direct html mode and defines character distance states', () => {
  assert.match(html, /assets\/vendor\/three-r128\.min\.js/);
  assert.match(html, /<script src="assets\/js\/script\.js" defer><\/script>/);
  assert.match(html, /data-stage-state="close"/);
  assert.match(html, /data-stage-state="mid"/);
  assert.match(html, /data-stage-state="wide"/);
  assert.match(script, /window\.THREE/);
  assert.match(script, /class DepthScene/);
  assert.match(script, /setCharacterState/);
  assert.match(script, /setDesktopSectionStyles/);
  assert.match(script, /body\.classList\.toggle\('fixed-camera-mode'/);
});

run('streamer a renewal avoids character-level hero title blur and uses two-layer desktop section transitions', () => {
  assert.doesNotMatch(script, /BlurText\('\.hero-title'/);
  assert.match(script, /const baseIndex = Math\.floor\(floatIndex\);/);
  assert.match(script, /const nextIndex = Math\.min\(baseIndex \+ 1, sections\.length - 1\);/);
  assert.match(script, /let lastDesktopDirection = 1;/);
  assert.match(script, /scrollDirection: lastDesktopDirection/);
  assert.match(script, /scrollVelocity: lastDesktopVelocity/);
  assert.match(script, /section\.classList\.toggle\('is-visible', isVisible\)/);
  assert.match(css, /\.hero-copy\s*\{[\s\S]*opacity:\s*var\(--hero-copy-opacity\);/);
  assert.match(css, /--hero-copy-opacity:\s*1;/);
  assert.match(css, /--hero-stage-opacity:\s*1;/);
  assert.match(css, /--section-saturate:\s*1;/);
  assert.match(css, /\.section-inner\s*\{[\s\S]*filter:\s*blur\(var\(--section-blur,\s*0px\)\)\s*saturate\(var\(--section-saturate,\s*1\)\);/);
  assert.match(css, /@media \(min-width: 861px\) \{[\s\S]*\.depth-section\s*\{[\s\S]*visibility:\s*hidden;/);
  assert.match(css, /@media \(min-width: 861px\) \{[\s\S]*\.depth-section\.is-visible,[\s\S]*visibility:\s*visible;/);
});

run('streamer a renewal keeps only key panels card-like and removes profile card wrappers', () => {
  assert.match(html, /class="glass-panel next-dive reveal"/);
  assert.match(html, /class="signal-form reveal"/);
  assert.doesNotMatch(html, /glass-panel profile-card profile-card-soft/);
  assert.doesNotMatch(html, /profile-card-minimal/);
  assert.match(html, /class="profile-card profile-entry reveal"/);
  assert.match(css, /\.profile-entry\s*\{/);
  assert.doesNotMatch(css, /\.profile-card-soft\s*\{/);
  assert.doesNotMatch(css, /\.profile-card-minimal\s*\{/);
});

run('streamer a renewal adds a direction-aware bubble layer to the depth scene', () => {
  assert.match(script, /this\.createBubbleLayer\(\);/);
  assert.match(script, /this\.particleSprite = this\.createSoftParticleTexture\(\);/);
  assert.match(script, /this\.bubbleSprite = this\.createBubbleTexture\(\);/);
  assert.match(script, /this\.beamSprite = this\.createBeamTexture\(\);/);
  assert.match(script, /this\.glowSprite = this\.createScatterGlowTexture\(\);/);
  assert.match(script, /createSoftParticleTexture\(\)\s*\{/);
  assert.match(script, /createBubbleTexture\(\)\s*\{/);
  assert.match(script, /createBeamTexture\(\)\s*\{/);
  assert.match(script, /createScatterGlowTexture\(\)\s*\{/);
  assert.match(script, /const heroRayStrength = Math\.max\(1 - sectionDepth \* 0\.88, 0\.08\);/);
  assert.match(script, /map: this\.particleSprite/);
  assert.match(script, /alphaMap: this\.particleSprite/);
  assert.match(script, /createBubbleLayer\(\)\s*\{/);
  assert.match(script, /map: this\.bubbleSprite/);
  assert.match(script, /alphaMap: this\.bubbleSprite/);
  assert.match(script, /map: this\.beamSprite/);
  assert.match(script, /map: this\.glowSprite/);
  assert.match(script, /const beamConfigs = \[/);
  assert.match(script, /this\.bubbles = \{/);
  assert.match(script, /this\.scrollVelocity = metrics\.scrollVelocity \|\| 0;/);
  assert.match(script, /recycleBubble\(positionArray, bubbleIndex, direction\)/);
  assert.match(script, /positionArray\[index \+ 1\] \+= velocity\[i\] \* \(0\.06 \+ burst \* 0\.16\) \* direction;/);
});
