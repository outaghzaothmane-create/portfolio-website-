const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'messages', 'en.json');
const frPath = path.join(__dirname, 'messages', 'fr.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));

enData.caseStudies.items = [
    {
      "title": "The $1.3M Automation Blueprint",
      "client": "Health Supply 770",
      "description": "Engineered a $1.3M revenue machine by deploying Universal Commerce Protocol (UCP) and self-healing AI agents that autonomously monitor and fix technical debt.",
      "tags": ["Automation", "Revenue Growth", "Technical SEO"],
      "metrics": [
        { "label": "Revenue", "value": "$1.3M+" },
        { "label": "Efficiency", "value": "100%" }
      ]
    },
    {
      "title": "Shopify SEO & UX Architecture",
      "client": "Fantasialife.com",
      "description": "Complete site architecture overhaul focusing on user experience and organic search visibility. Redesigned navigation and product structure for maximum crawlability.",
      "tags": ["Shopify", "UX Design", "E-commerce SEO"],
      "metrics": [
        { "label": "Traffic", "value": "+80%" },
        { "label": "Conv. Rate", "value": "+2.5%" }
      ]
    },
    {
      "title": "E-commerce SEO & Content Strategy",
      "client": "Epoptique.ma",
      "description": "Long-term SEO strategy and optimization. Implemented comprehensive content strategy and technical improvements for sustainable organic growth.",
      "tags": ["E-commerce", "Content Strategy", "Technical SEO"],
      "metrics": [
        { "label": "Traffic", "value": "+150%" },
        { "label": "Keywords", "value": "500+" }
      ]
    }
];

frData.caseStudies.items = [
    {
      "title": "Le Schéma d'Automatisation à 1,3M$",
      "client": "Health Supply 770",
      "description": "Conception d'une machine à revenus de 1,3M$ en déployant le Protocole de Commerce Universel (UCP) et des agents IA auto-réparateurs qui surveillent et corrigent de manière autonome la dette technique.",
      "tags": ["Automatisation", "Croissance des Revenus", "SEO Technique"],
      "metrics": [
        { "label": "Revenus", "value": "1,3M$+" },
        { "label": "Efficacité", "value": "100%" }
      ]
    },
    {
      "title": "SEO Shopify & Architecture UX",
      "client": "Fantasialife.com",
      "description": "Refonte complète de l'architecture du site axée sur l'expérience utilisateur et la visibilité dans les recherches organiques. Refonte de la navigation et de la structure des produits pour une explorabilité maximale.",
      "tags": ["Shopify", "Design UX", "SEO E-commerce"],
      "metrics": [
        { "label": "Trafic", "value": "+80%" },
        { "label": "Taux de Conv.", "value": "+2,5%" }
      ]
    },
    {
      "title": "SEO E-commerce & Stratégie de Contenu",
      "client": "Epoptique.ma",
      "description": "Stratégie et optimisation SEO à long terme. Mise en œuvre d'une stratégie de contenu complète et d'améliorations techniques pour une croissance organique durable.",
      "tags": ["E-commerce", "Stratégie de Contenu", "SEO Technique"],
      "metrics": [
        { "label": "Trafic", "value": "+150%" },
        { "label": "Mots-clés", "value": "500+" }
      ]
    }
];

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log("Updated case studies in translations");
