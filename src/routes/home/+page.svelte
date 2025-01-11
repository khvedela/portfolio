<script lang="ts">
    import { onMount } from 'svelte';
    import EarthScene from '../../components/MonasteryScene.svelte';

    let scrollPosition = 0;   // Interpolated scroll position
    let targetScroll = 0;     // Target scroll position for smooth animation

    // Smoothly updates scrollPosition => subtle parallax or rotating effect in EarthScene
    const smoothScroll = () => {
        scrollPosition += (targetScroll - scrollPosition) * 0.1;
        window.requestAnimationFrame(smoothScroll);
    };

    const onScroll = () => {
        targetScroll = window.scrollY;
    };

    onMount(() => {
        window.addEventListener('scroll', onScroll);
        window.requestAnimationFrame(smoothScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    });
</script>

<style>
    /* Optional: If you need additional styles */
</style>

<section class="relative w-screen min-h-screen overflow-hidden">
    <!-- EarthScene as background -->
    <EarthScene {scrollPosition} />

    <!-- Top Navigation Bar -->
    <nav class="fixed top-0 left-0 w-full bg-transparent backdrop-filter backdrop-blur-lg z-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex-shrink-0">
                    <!-- Logo or Brand Name -->
                    <a href="#" class="text-white text-xl font-bold">MyBrand</a>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#home" class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Home</a>
                        <a href="#about" class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">About</a>
                        <a href="#contact" class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Contact</a>
                        <!-- Add more navigation links as needed -->
                    </div>
                </div>
                <!-- Mobile menu button can be added here if needed -->
            </div>
        </div>
    </nav>

    <!-- Centered Name -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
        <h1 class="mix-blend-multiply text-4xl md:text-6xl font-bold">David Khvedelidze</h1>
    </div>
</section>