import { useEffect } from "react";

interface SubdomainRedirectProps {
    subdomain: "blog" | "courses";
}

const SubdomainRedirect = ({ subdomain }: SubdomainRedirectProps) => {
    useEffect(() => {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);

        // Replace hostname with subdomain
        const baseDomain = url.hostname.replace(/^(www\.)?/, "");
        const newHostname = `${subdomain}.${baseDomain}`;

        // Construct new URL
        const newUrl = `${url.protocol}//${newHostname}${url.pathname}${url.search}${url.hash}`;

        // Redirect
        window.location.replace(newUrl);
    }, [subdomain]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-foreground font-mono">
                Redirecting to {subdomain}.devdavid.me...
            </div>
        </div>
    );
};

export default SubdomainRedirect;
