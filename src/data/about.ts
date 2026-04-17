export interface AboutItem {
  id: string;
  label: string;
  title: string;
  body: string;
}

export const about: AboutItem[] = [
  {
    id: "data-foundations",
    label: "Background",
    title: "Data Foundations",
    body: "**I’ve spent six years building machine learning systems** and governed data foundations across fintech, central banking, and research. **I like owning the stack end-to-end** — from data ingestion to polished data products that build trust, create business value, and reduce costs. The projects I get most excited about have a clear line of sight to impact, whether that means cutting inference costs by 5%, creating a dashboard that becomes the organization’s single source of truth, or expanding automation in ways that meaningfully improve operations.",
  },
  {
    id: "product-data-scientist",
    label: "What I Do",
    title: "Product Data Scientist",
    body: "**I work where data meets decisions** — partnering with product and strategy teams to define KPIs, design research-grounded experiments, and ship models that actually move the numbers. My focus is on explainable outputs, responsible AI metrics, and the discipline to validate findings before scaling, so the **things I build stay useful long after launch**.",
  },
  {
    id: "applied-research",
    label: "Insights",
    title: "Applied Research",
    body: "**I was trained as an economist and became obsessed with behavior**. I use causal inference, randomized trials, and behavioral science to understand how people actually make decisions, then turn those insights into product and policy. Recent work includes CEP causal analysis on 100M+ student records, pre-registered studies on framing and trust, and five machine learning studies produced for central bank leadership.",
  },
];