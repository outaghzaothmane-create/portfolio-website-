import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
    name: "othmane-portfolio",
    title: "Othmane SEO Blog",
    basePath: studioUrl,
    projectId,
    dataset,
    schema: {
        types: schemaTypes,
    },
    plugins: [
        structureTool(),
        visionTool({ defaultApiVersion: apiVersion }),
    ],
});
