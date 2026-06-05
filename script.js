/* ============================================
   DVARABELL — JavaScript Logic
   ============================================ */

'use strict';

// ── Elements ──────────────────────────────────
const bellBtn         = document.getElementById('bellBtn');
const bellIcon        = document.getElementById('bellIcon');
const door            = document.getElementById('door');
const wallFrame       = document.querySelector('.wall-frame');
const jumpscareOverlay = document.getElementById('jumpscareOverlay');
const resetContainer  = document.getElementById('resetContainer');
const resetBtn        = document.getElementById('resetBtn');
const dareText        = document.getElementById('dareText');
const btnRipple       = document.getElementById('btnRipple');

// ── State ─────────────────────────────────────
let isAnimating = false;

// ── Spawn particles ────────────────────────────
(function spawnParticles() {
  const container = document.getElementById('particles');
  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const x = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 120;
    const dur  = (3 + Math.random() * 6).toFixed(2) + 's';
    const delay = (Math.random() * 8).toFixed(2) + 's';
    p.style.cssText = `
      left: ${x}%;
      --dur: ${dur};
      --delay: -${delay};
      --drift: ${drift}px;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      opacity: ${0.2 + Math.random() * 0.6};
    `;
    container.appendChild(p);
  }
})();

// ── Button ripple ──────────────────────────────
bellBtn.addEventListener('click', (e) => {
  if (isAnimating) return;

  const rect = bellBtn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  btnRipple.style.width  = size + 'px';
  btnRipple.style.height = size + 'px';
  btnRipple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
  btnRipple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
  btnRipple.classList.remove('animate');
  void btnRipple.offsetWidth; // reflow
  btnRipple.classList.add('animate');

  startSequence();
});

// ── Main sequence ──────────────────────────────
function startSequence() {
  isAnimating = true;
  bellBtn.disabled = true;
  dareText.style.opacity = '0';

  // Step 1: Bell rings rapidly
  bellIcon.classList.add('ringing');
  playBellSound();

  // Step 2: After 600ms — door starts creaking open + glow
  setTimeout(() => {
    wallFrame.classList.add('glowing');
    door.classList.add('open');
    playCreakSound();
  }, 600);

  // Step 3: After 1600ms — screen shakes
  setTimeout(() => {
    document.body.classList.add('shaking');
  }, 1600);

  // Step 4: After 2200ms — JUMPSCARE
  setTimeout(() => {
    document.body.classList.remove('shaking');
    triggerJumpscare();
  }, 2200);
}

// ── Jumpscare ─────────────────────────────────
function triggerJumpscare() {
  jumpscareOverlay.setAttribute('aria-hidden', 'false');
  jumpscareOverlay.classList.add('active', 'flash-red');

  // Re-trigger zoom animation
  const img = document.getElementById('jumpscareImg');
  img.style.animation = 'none';
  void img.offsetWidth;
  img.style.animation = '';

  playScreamSound();

  // Screen strobe
  let strobeCount = 0;
  const strobeInterval = setInterval(() => {
    document.body.style.filter = strobeCount % 2 === 0
      ? 'brightness(2.5) saturate(0.2)'
      : 'brightness(0.3)';
    strobeCount++;
    if (strobeCount >= 6) {
      clearInterval(strobeInterval);
      document.body.style.filter = '';
    }
  }, 60);

  // Show reset button after delay
  setTimeout(() => {
    resetContainer.setAttribute('aria-hidden', 'false');
    resetContainer.classList.add('visible');
  }, 1500);
}

// ── Sounds via Web Audio API ───────────────────
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getCtx() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function playBellSound() {
  const ctx = getCtx();
  // Quick series of bell dings
  [0, 0.08, 0.16, 0.24, 0.32].forEach((delay, i) => {
    setTimeout(() => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 + i * 40, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    }, delay * 1000);
  });
}

function playCreakSound() {
  const ctx = getCtx();
  // Low creaky door sound using noise + filter
  const bufferSize = ctx.sampleRate * 1.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 0.3);
  }

  const src    = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain   = ctx.createGain();

  src.buffer = buffer;
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(120, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(60, ctx.currentTime + 1.5);
  filter.Q.value = 0.8;

  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start(ctx.currentTime);
}

function playScreamSound() {
  const ctx = getCtx();

  // Loud dissonant chord with shrieking overtones
  [[220, 0.3], [277, 0.2], [311, 0.15], [880, 0.25], [1760, 0.15]].forEach(([freq, vol]) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const dist = ctx.createWaveShaper();

    // Distortion curve
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = (Math.PI + 400) * x / (Math.PI + 400 * Math.abs(x));
    }
    dist.curve = curve;

    osc.connect(dist);
    dist.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(freq * 1.05, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.5);
  });

  // Low rumble
  const rumbleOsc = ctx.createOscillator();
  const rumbleGain = ctx.createGain();
  rumbleOsc.connect(rumbleGain);
  rumbleGain.connect(ctx.destination);
  rumbleOsc.type = 'sine';
  rumbleOsc.frequency.value = 55;
  rumbleGain.gain.setValueAtTime(0.4, ctx.currentTime);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
  rumbleOsc.start(ctx.currentTime);
  rumbleOsc.stop(ctx.currentTime + 1.5);
}

// ── Reset ─────────────────────────────────────
resetBtn.addEventListener('click', resetScene);

function resetScene() {
  // Hide jumpscare
  jumpscareOverlay.classList.remove('active', 'flash-red');
  jumpscareOverlay.setAttribute('aria-hidden', 'true');

  // Hide reset
  resetContainer.classList.remove('visible');
  resetContainer.setAttribute('aria-hidden', 'true');

  // Close door (reset)
  door.classList.remove('open');
  wallFrame.classList.remove('glowing');
  bellIcon.classList.remove('ringing');

  // Re-enable button
  setTimeout(() => {
    bellBtn.disabled = false;
    dareText.style.opacity = '1';
    isAnimating = false;
  }, 800);
}

// ── Keyboard support ───────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'Enter') {
    if (!isAnimating && document.activeElement === bellBtn) return; // let default handle it
    if (!isAnimating) {
      bellBtn.focus();
      bellBtn.click();
    }
  }
  if (e.code === 'Escape' && jumpscareOverlay.classList.contains('active')) {
    resetScene();
  }
});
