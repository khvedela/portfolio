<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Loading from '../shared/Loading.svelte';
  import MonasteryScene from '../components/MonasteryScene.svelte';

  let isSceneLoaded = false;
  let introSection: HTMLElement;
  let aboutSection: HTMLElement;
  let text1: HTMLElement;
  let text2: HTMLElement;

  const texts = ["David Khvedelidze", "Full Stack Engineer", "Web Entusiast"];
  let textIndex = texts.length - 1;
  let time = new Date();
  const morphTime = 2;
  const cooldownTime = 2;
  let morph = 0;
  let cooldown = cooldownTime;

  const handleSceneLoad = () => {
    isSceneLoaded = true;
    morphTexts();
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
      text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      fraction = 1 - fraction;
      text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      text1.textContent = texts[textIndex % texts.length];
      text2.textContent = texts[(textIndex + 1) % texts.length];
    };

    const doCooldown = () => {
      morph = 0;
      text2.style.filter = "";
      text2.style.opacity = "100%";
      text1.style.filter = "";
      text1.style.opacity = "0%";
    };

    const animate = () => {
      requestAnimationFrame(animate);
      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime.getTime() - time.getTime()) / 1000;
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
    // No scroll logic here now
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
    <!-- <header
      class="fixed top-0 left-0 w-full px-6 py-4 flex justify-center items-center z-20"
      in:fade={{ duration: 800 }}
    >
      <nav class="relative flex gap-8 text-lg font-bold medieval-font text-white">
        <a href="#intro" class="nav-link">Home</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
    </header> -->
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

    <!-- Extra placeholders -->
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
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  .medieval-font {
    font-family: 'Cinzel', serif;
  }
  .nav-link {
    position: relative;
    text-decoration: none;
    color: #fff;
    transition: color 0.3s ease, text-shadow 0.3s ease;
  }
  .nav-link:hover {
    color: #d4af37;
    text-shadow: 0 0 8px #d4af37, 0 0 16px #d4af37;
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
    text-shadow:
      0 0 6px  #8B0000,
      0 0 10px #8B0000,
      0 0 20px #8B0000;
  }
</style>