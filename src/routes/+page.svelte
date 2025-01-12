<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Loading from '../shared/Loading.svelte';
	import MonasteryScene from '../components/MonasteryScene.svelte';

	let isSceneLoaded = false;
	let introSection: HTMLElement;
	let text1: HTMLElement | null = null;
	let text2: HTMLElement | null = null;

	const texts = ['David Khvedelidze', 'Full Stack Engineer', 'Web Enthusiast'];
	let textIndex = texts.length - 1;
	let time = new Date();
	const morphTime = 2;
	const cooldownTime = 2;
	let morph = 0;
	let cooldown = cooldownTime;
	let sectionVisible = false;

	// Parallax offset for About Me heading
	let parallaxOffset = 0;

	/**
	 * Called when the 3D scene dispatches 'loaded'.
	 */
	const handleSceneLoad = () => {
		isSceneLoaded = true;

		// Retry text references if they aren't ready
		if (text1 && text2) {
			morphTexts();
		} else {
			retryInitialization();
		}
	};

	const retryInitialization = () => {
		const interval = setInterval(() => {
			if (text1 && text2) {
				clearInterval(interval);
				morphTexts();
			}
		}, 100);
	};

	/**
	 * Handles the morph animation between text1 and text2.
	 */
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
			text2.style.filter = '';
			text2.style.opacity = '100%';
			text1.style.filter = '';
			text1.style.opacity = '0%';
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

	/**
	 * Simple parallax effect for the About heading as the user scrolls.
	 */
	function handleScroll() {
		const scrollY = window.scrollY || window.pageYOffset;
		parallaxOffset = Math.min(scrollY * 0.2, 80);
		// Capping offset so it doesn't go too far
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		if (!text1 || !text2) retryInitialization();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						sectionVisible = true; // Trigger animations
					}
					if (section) {
						observer.unobserve(section);
					}
				});
			},
			{ threshold: 0.1 } // Trigger when 10% of the section is visible
		);

		const section = document.getElementById('about');
		if (section) {
			observer.observe(section);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function scrollToAbout() {
		const aboutSection = document.getElementById('about');
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<main class="relative min-h-screen w-full overflow-hidden">
	<!-- Optional glitch filter definition -->
	<svg style="position: absolute; width: 0; height: 0;">
		<defs>
			<filter id="threshold" x="0" y="0" width="100%" height="100%">
				<feColorMatrix
					in="SourceGraphic"
					type="matrix"
					values="1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 255 -140"
				/>
			</filter>
		</defs>
	</svg>

	<!-- 3D Scene behind everything -->
	<MonasteryScene on:loaded={handleSceneLoad} />

	<!-- Loading Overlay -->
	{#if !isSceneLoaded}
		<div
			class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80"
			in:fade
			out:fade
		>
			<Loading message="Loading..." />
		</div>
	{/if}

	<!-- Main content once scene is loaded -->
	{#if isSceneLoaded}
		<!-- INTRO SECTION -->
		<section
			id="intro"
			bind:this={introSection}
			class="relative z-10 flex min-h-screen w-full items-center justify-center px-8"
			in:fade={{ duration: 800 }}
		>
			<div
				id="container"
				class="relative h-full w-full"
				style="filter: url(#threshold) blur(0.6px);"
			>
				<!-- Absolutely center text1 -->
				<span
					id="text1"
					bind:this={text1}
					class="font-cinzel absolute left-1/2 top-1/2 -translate-x-1/2
                         -translate-y-1/2 select-none text-5xl text-[#8b0000]
                         [text-shadow:_0_0_6px_#8b0000,_0_0_10px_#8b0000,_0_0_20px_#8b0000]"
				></span>
				<!-- Absolutely center text2 on top of text1 -->
				<span
					id="text2"
					bind:this={text2}
					class="font-cinzel absolute left-1/2 top-1/2 -translate-x-1/2
                         -translate-y-1/2 select-none text-5xl text-[#8b0000]
                         [text-shadow:_0_0_6px_#8b0000,_0_0_10px_#8b0000,_0_0_20px_#8b0000]"
				></span>
			</div>

			<!-- Scroll Down Indicator -->
			<div
				class="absolute bottom-6 flex animate-bounce cursor-pointer flex-col items-center
                     text-gray-300 transition-opacity duration-300 hover:opacity-80"
				on:click={scrollToAbout}
				aria-label="Scroll Down"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
				<span class="text-sm">Scroll Down</span>
			</div>
		</section>

		<!-- ABOUT SECTION -->
		<section
			id="about"
			class="relative z-10 flex min-h-screen w-full bg-gradient-to-b from-transparent to-[#070707] text-gray-200"
		>
			<!-- Animated Gridlines -->
			<div
				class="animate-gridlines pointer-events-none absolute inset-0 z-0"
				style="
              background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
              background-size: 40px 40px;
          "
			></div>

			<!-- Content -->
			<div class="relative z-10 grid h-full w-full grid-cols-12 gap-4 px-6 py-16">
				<!-- Heading -->
				<h1
					class="col-start-2 col-end-12 text-center text-5xl font-extrabold leading-tight text-white md:text-4xl lg:col-start-3 lg:col-end-11 lg:text-6xl"
				>
					About Me
				</h1>

				<!-- Subtext -->
				<p
					class="col-start-2 col-end-12 text-center text-lg leading-relaxed text-gray-300 md:text-xl lg:col-start-3 lg:col-end-11 lg:text-2xl"
				>
					I'm David Khvedelidze, a passionate Full Stack Engineer dedicated to creating dynamic and
					responsive web applications. With a keen eye for design and a love for technology, I
					strive to build seamless digital experiences that engage and inspire users.
				</p>

				<!-- Skills Grid -->
				<div
					class="col-start-2 col-end-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-start-3 lg:col-end-11 lg:grid-cols-3"
				>
					<!-- Skill Card 1 -->
					<div
						class="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-[#ff4d4d]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 10c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 2v4m0 16v4m10-10h-4M6 12H2"
							/>
						</svg>
						<h3 class="mt-4 text-xl font-semibold text-white">Web Development</h3>
						<p class="mt-2 text-center text-gray-400">
							Expertise in building responsive and dynamic web applications using modern frameworks
							and technologies.
						</p>
					</div>

					<!-- Skill Card 2 -->
					<div
						class="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-[#ff4d4d]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 10c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 2v4m0 16v4m10-10h-4M6 12H2"
							/>
						</svg>
						<h3 class="mt-4 text-xl font-semibold text-white">UI/UX Design</h3>
						<p class="mt-2 text-center text-gray-400">
							Creating intuitive and visually appealing designs that enhance user experience.
						</p>
					</div>

					<!-- Skill Card 3 -->
					<div
						class="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-[#ff4d4d]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 10c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 2v4m0 16v4m10-10h-4M6 12H2"
							/>
						</svg>
						<h3 class="mt-4 text-xl font-semibold text-white">Backend Development</h3>
						<p class="mt-2 text-center text-gray-400">
							Building robust and scalable server-side applications to support front-end
							functionalities.
						</p>
					</div>

					<!-- Skill Card 4 -->
					<div
						class="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-[#ff4d4d]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 10c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 2v4m0 16v4m10-10h-4M6 12H2"
							/>
						</svg>
						<h3 class="mt-4 text-xl font-semibold text-white">Problem Solving</h3>
						<p class="mt-2 text-center text-gray-400">
							Delivering creative solutions to complex challenges with a focus on efficiency and
							performance.
						</p>
					</div>

					<!-- Skill Card 5 -->
					<div
						class="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-[#ff4d4d]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 10c2.21 0 4-1.79 4-4H8c0 2.21 1.79 4 4 4z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 2v4m0 16v4m10-10h-4M6 12H2"
							/>
						</svg>
						<h3 class="mt-4 text-xl font-semibold text-white">Team Collaboration</h3>
						<p class="mt-2 text-center text-gray-400">
							Working effectively within diverse teams to deliver high-quality software solutions.
						</p>
					</div>
				</div>

				<!-- Contact Button -->
				<div class="col-start-2 col-end-12 text-center lg:col-start-3 lg:col-end-11">
					<a
						href="#contact"
						class="inline-block transform rounded-lg bg-[#ff4d4d] px-10 py-4 text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#e63939]"
					>
						Contact Me
					</a>
				</div>
			</div>
		</section>

		<!-- FOOTER -->
		<footer class="relative z-10 bg-[#070707] py-6 text-center text-sm text-gray-400">
			<!-- "Back to top" arrow/link -->
			<div
				class="mb-3 flex cursor-pointer flex-col items-center justify-center transition-colors hover:text-[#ff4d4d]"
				on:click={scrollToTop}
				aria-label="Back to Top"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="mb-1 h-6 w-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
				</svg>
				<span class="text-xs">Back to Top</span>
			</div>

			<!-- Single LinkedIn link -->
			<div class="mb-2">
				<a
					href="https://www.linkedin.com/in/khvedelidzedavid/"
					target="_blank"
					rel="noopener"
					class="inline-block font-medium transition-colors duration-300 hover:text-[#ff4d4d]"
				>
					LinkedIn
				</a>
			</div>

			<p class="text-xs font-light">
				&copy; {new Date().getFullYear()} David Khvedelidze
			</p>
		</footer>
	{/if}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

	:global(.font-cinzel) {
		font-family: 'Cinzel', serif;
	}

	@media (max-width: 768px) {
		:global(#text1),
		:global(#text2) {
			font-size: 2rem;
		}
	}

	/* Keyframe Animations */
	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Animation Classes */
	.animate-fade-in {
		animation: fadeIn 1s ease-out forwards;
	}

	.animate-fade-in-delay {
		animation: fadeIn 1.2s ease-out forwards;
		animation-delay: 0.3s;
	}

	.animate-fade-in-delay-long {
		animation: fadeIn 1.4s ease-out forwards;
		animation-delay: 0.6s;
	}

	/* Responsive Adjustments */
	@media (max-width: 1024px) {
		#about .grid {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}

	/* Ensure the gridlines do not interfere with content */
	.pointer-events-none {
		pointer-events: none;
	}

	/* Ensure content stays within grid columns */
	.col-span-12 {
		grid-column: span 12 / span 12;
	}

	@media (min-width: 1024px) {
		.lg\:col-span-10 {
			grid-column: span 10 / span 10;
		}
		.xl\:col-span-8 {
			grid-column: span 8 / span 8;
		}
	}
</style>
