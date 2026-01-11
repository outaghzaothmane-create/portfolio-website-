export function Schema() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Othmane Outaghza",
        "jobTitle": "Senior SEO & Automation Manager",
        "url": "https://othmane.seo",
        "sameAs": [
            "https://www.linkedin.com/in/othmaneoutaghza/",
            "https://github.com/othmane"
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "Health Supply 770"
        },
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "University of Jiangsu"
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Othmane.SEO",
        "url": "https://othmane.seo",
        "logo": {
            "@type": "ImageObject",
            "url": "https://othmane.seo/logo.png",
            "width": 192,
            "height": 192
        },
        "image": {
            "@type": "ImageObject",
            "url": "https://othmane.seo/og-image.jpg",
            "width": 1200,
            "height": 630
        },
        "description": "Senior SEO & Automation Manager specializing in driving organic revenue through data-driven SEO strategies and automation.",
        "sameAs": [
            "https://www.linkedin.com/in/othmaneoutaghza/",
            "https://github.com/othmane"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "availableLanguage": ["en"]
        }
    };

    const profilePageSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "dateCreated": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "mainEntity": personSchema
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
            />
        </>
    );
}
