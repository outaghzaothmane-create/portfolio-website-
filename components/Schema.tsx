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

    const profilePageSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "dateCreated": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "mainEntity": personSchema
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
    );
}
