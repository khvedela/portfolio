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

/**
 * Get the URL for the blog
 * Always returns the blog subdomain URL
 */
export const getBlogUrl = (): string => {
    if (typeof window === "undefined") return "/blog";

    const hostname = window.location.hostname;
    const baseDomain = hostname.replace(/^(www\.|blog\.|courses\.)/, "");

    return `${window.location.protocol}//blog.${baseDomain}`;
};

/**
 * Get the URL for courses
 * Always returns the courses subdomain URL
 */
export const getCoursesUrl = (): string => {
    if (typeof window === "undefined") return "/courses";

    const hostname = window.location.hostname;
    const baseDomain = hostname.replace(/^(www\.|blog\.|courses\.)/, "");

    return `${window.location.protocol}//courses.${baseDomain}`;
};
