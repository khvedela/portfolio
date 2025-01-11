<script lang="ts">
  // Customize these props as you wish
  export let message: string = "Loading...";
  export let size: number = 150;         // The size of the SVG
  export let color: string = "#8B0000";  // A "blood red"
  export let strokeWidth: number = 3;    // Width of the wave stroke
</script>

<div class="loader-wrapper">
  <!-- SVG container -->
  <div class="wave-container" style="width: {size}px; height: {size}px;">
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- A simple wave path repeated horizontally.
           We'll animate it by moving the stroke-dashoffset. -->
      <path
        class="wave-path"
        d="M 0,50 
           C 20,20 80,80 100,50 
           C 120,20 180,80 200,50"
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-dasharray="200" 
        stroke-dashoffset="200"
      />
    </svg>
  </div>

  <!-- Loading message under the wave -->
  <p class="loader-message">{message}</p>
</div>

<style>
  /* Center the loader contents */
  .loader-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* This container can also rotate or scale if you like */
  .wave-container {
    position: relative;
    overflow: hidden; /* Keep the wave masked to the container if you prefer */
  }

  .wave-path {
    animation: waveMove 1.5s linear infinite;
  }

  @keyframes waveMove {
    0% {
      stroke-dashoffset: 200;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  .loader-message {
    margin-top: 1rem;
    color: #fff;
    font-size: 1.1rem;
    text-align: center;
    font-family: 'Times New Roman', serif;
  }
</style>