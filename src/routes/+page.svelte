<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Loading from '../shared/Loading.svelte';
  import MonasteryScene from '../components/MonasteryScene.svelte';

  let isSceneLoaded = false;
  let introSection: HTMLElement;
  let aboutSection: HTMLElement;
  let text1: HTMLElement | null = null;
  let text2: HTMLElement | null = null;

  const texts = ["David Khvedelidze", "Full Stack Engineer", "Web Enthusiast"];
  let textIndex = texts.length - 1;
  let time = new Date();
  const morphTime = 2;
  const cooldownTime = 2;
  let morph = 0;
  let cooldown = cooldownTime;

  const handleSceneLoad = () => {
    isSceneLoaded = true;

    // Retry initialization if text elements are not ready
    if (text1 && text2) {
      console.log('Text elements initialized. Starting morphing.');
      morphTexts();
    } else {
      console.warn('Text elements not ready. Retrying initialization...');
      retryInitialization();
    }
  };

  const retryInitialization = () => {
    const interval = setInterval(() => {
      if (text1 && text2) {
        console.log('Text elements are now initialized.');
        clearInterval(interval);
        morphTexts();
      }
    }, 100); // Retry every 100ms
  };

  const morphTexts = () => {
    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    const setMorph = (fraction: number) => {
      if (!text1 || !text2) return;

      const blurAmount1 = Math.min(8 / (1 - fraction) - 8, 100);
      const blurAmount2 = Math.min(8 / fraction - 8, 100);

      text1.style.filter = `blur(${blurAmount1}px)`;
      text1.style.opacity = `${1 - fraction}`;
      text1.textContent = texts[textIndex % texts.length];

      text2.style.filter = `blur(${blurAmount2}px)`;
      text2.style.opacity = `${fraction}`;
      text2.textContent = texts[(textIndex + 1) % texts.length];
    };

    const doCooldown = () => {
      if (!text1 || !text2) return;

      morph = 0;
      text2.style.filter = "";
      text2.style.opacity = "100%";
      text1.style.filter = "";
      text1.style.opacity = "0%";
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) textIndex++;
        doMorph();
      } else {
        doCooldown();
      }
    };

    animate();
  };

  onMount(() => {
    console.log('Attempting initialization', new Date());
    if (!text1 || !text2) {
      console.warn('Text elements are not bound properly on mount. Retrying...');
      retryInitialization();
    }
  });
</script>

<main class="relative min-h-screen w-full overflow-hidden">
  <svg style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="threshold" x="0" y="0" width="100%" height="100%">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>

  {#if isSceneLoaded}
    <!-- Navigation placeholder if needed -->
  {/if}

  <MonasteryScene on:loaded={handleSceneLoad} />

  {#if !isSceneLoaded}
    <div class="overlay" in:fade out:fade>
      <Loading message="Loading..." />
    </div>
  {/if}

  {#if isSceneLoaded}
    <section
      id="intro"
      bind:this={introSection}
      class="relative z-10 min-h-screen w-full flex items-center px-8"
      in:fade={{ duration: 800 }}
    >
      <div id="container" class="relative text-left">
        <span id="text1" bind:this={text1}></span>
        <span id="text2" bind:this={text2}></span>
      </div>
    </section>

    <!-- Placeholder sections -->
    <section class="w-full h-screen"></section>
    <section class="w-full h-screen"></section>
    <section class="w-full h-screen"></section>
    <section class="w-full h-screen"></section>
  {/if}
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  #container {
    position: relative;
    filter: url(#threshold) blur(0.6px);
  }

  #text1,
  #text2 {
    position: absolute;
    font-size: 5rem;
    font-family: 'Cinzel', serif;
    color: #8B0000;
    user-select: none;
    text-shadow: 0 0 6px #8B0000, 0 0 10px #8B0000, 0 0 20px #8B0000;
  }
</style>