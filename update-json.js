const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'messages', 'en.json');
const frPath = path.join(__dirname, 'messages', 'fr.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));

const auditModalEn = {
    title: "Professional SEO Audit",
    descriptionIdle: "Enter your URL for a comprehensive technical analysis.",
    descriptionScanning: "Running expert-level diagnostics...",
    descriptionComplete: "Audit Complete. Review your health score below.",
    websiteUrlLabel: "Website URL",
    websiteUrlPlaceholder: "example.com",
    runAnalysisBtn: "Run Analysis",
    steps: [
        { id: "connect", label: "Connecting to server..." },
        { id: "crawl", label: "Crawling page content..." },
        { id: "analyze", label: "Analyzing meta tags & structure..." },
        { id: "score", label: "Calculating health score..." }
    ],
    scoreLabel: "Score",
    pdfReport: "PDF Report",
    textReport: "Text",
    googleSearchPreview: "Google Search Preview",
    untitledPage: "Untitled Page",
    noMetaDescription: "No meta description available.",
    loadTime: "Load Time",
    mobileReady: "Mobile Ready",
    socialReady: "Social Ready",
    schema: "Schema",
    words: "Words",
    internalLinks: "Internal Links",
    missingAlt: "Missing Alt",
    sitemap: "Sitemap.xml",
    robotsTxt: "Robots.txt",
    found: "Found",
    missing: "Missing",
    yes: "Yes",
    no: "No",
    optimizationOpportunities: "Optimization Opportunities",
    noCriticalIssues: "No critical issues found!",
    unlockFullReport: "Unlock Full Expert Report",
    unlockFullReportDesc: "Get the detailed analysis with actionable advice sent to your inbox.",
    emailPlaceholder: "Enter your email",
    sendReport: "Send Report",
    reportSent: "Report sent to",
    closeAnalysis: "Close Analysis",
    errors: {
        validUrl: "Please enter a valid URL (e.g., example.com)",
        validEmail: "Please enter a valid email address",
        botBlocked: "Site may block automated requests. Try a different URL.",
        auditFailed: "Audit failed",
        scanFailed: "Scan failed. The site may block bots or be unavailable."
    }
};

const auditModalFr = {
    title: "Audit SEO Professionnel",
    descriptionIdle: "Entrez votre URL pour une analyse technique complète.",
    descriptionScanning: "Exécution des diagnostics d'expert...",
    descriptionComplete: "Audit Terminé. Consultez votre score de santé ci-dessous.",
    websiteUrlLabel: "URL du site web",
    websiteUrlPlaceholder: "exemple.com",
    runAnalysisBtn: "Lancer l'Analyse",
    steps: [
        { id: "connect", label: "Connexion au serveur..." },
        { id: "crawl", label: "Exploration du contenu de la page..." },
        { id: "analyze", label: "Analyse des balises meta & de la structure..." },
        { id: "score", label: "Calcul du score de santé..." }
    ],
    scoreLabel: "Score",
    pdfReport: "Rapport PDF",
    textReport: "Texte",
    googleSearchPreview: "Aperçu de la Recherche Google",
    untitledPage: "Page sans Titre",
    noMetaDescription: "Aucune meta description disponible.",
    loadTime: "Temps de Chargement",
    mobileReady: "Compatible Mobile",
    socialReady: "Prêt pour Réseaux Sociaux",
    schema: "Schema",
    words: "Mots",
    internalLinks: "Liens Internes",
    missingAlt: "Alt Manquant",
    sitemap: "Sitemap.xml",
    robotsTxt: "Robots.txt",
    found: "Trouvé",
    missing: "Manquant",
    yes: "Oui",
    no: "Non",
    optimizationOpportunities: "Opportunités d'Optimisation",
    noCriticalIssues: "Aucun problème critique trouvé !",
    unlockFullReport: "Débloquer le Rapport Complet",
    unlockFullReportDesc: "Recevez l'analyse détaillée avec des conseils pratiques dans votre boîte de réception.",
    emailPlaceholder: "Entrez votre email",
    sendReport: "Envoyer le Rapport",
    reportSent: "Rapport envoyé à",
    closeAnalysis: "Fermer l'Analyse",
    errors: {
        validUrl: "Veuillez entrer une URL valide (ex: exemple.com)",
        validEmail: "Veuillez entrer une adresse email valide",
        botBlocked: "Le site peut bloquer les requêtes automatisées. Essayez une autre URL.",
        auditFailed: "L'audit a échoué",
        scanFailed: "L'analyse a échoué. Le site peut bloquer les bots ou être indisponible."
    }
};

enData.auditModal = auditModalEn;
frData.auditModal = auditModalFr;

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log("JSON updated successfully");
