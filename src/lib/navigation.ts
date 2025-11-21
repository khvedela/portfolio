/**
 * Get the URL for the main portfolio page
 * If on a subdomain, returns the main domain URL
 * Otherwise returns "/"
 */
export const getPortfolioUrl = (): string => {
    if (typeof window === "undefined") return "/";

    const hostname = window.location.hostname;
    const isBlogHost = hostname.startsWith("blog.");
    const isCoursesHost = hostname.startsWith("courses.");

    // If on a subdomain, redirect to main domain
    if (isBlogHost || isCoursesHost) {
        const baseDomain = hostname.replace(/^(blog\.|courses\.)/, "");
        return `${window.location.protocol}//${baseDomain}`;
    }

    // Otherwise use relative path
    return "/";
};
