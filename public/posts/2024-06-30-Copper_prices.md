---
layout: distill
title: Copper Prices Are Climbing, What’s Behind the Surge?
description: Copper, often called “the metal of the future,” has seen a significant price rally in 2024, with its value increasing by about 15% this year alone. This is a partial translation of the analysis we conducted on the <a href=https://www.bcentral.cl/documents/33528/5969425/Minutas_citadas_en_el_IPoM_junio_2024.pdf/4feebecd-46e5-a30b-36eb-d62571abebd3?t=1720106814290>minutes cited</a> for the <a href=https://www.bcentral.cl/documents/33528/5969425/MPR-June-2024.pdf/cad70fea-2923-81aa-479d-53dc9dced4e5?t=1719842552257>Monetary Policy Report</a> of the CBCH, Jun 2024
tags: Economy Commodities Global Analytics ML
giscus_comments: true
date: 2024-06-30
featured: false

authors:
  - name: Diego Rodriguez
    url:
    affiliations:
      name: Duke University

bibliography: false

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Context
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Short-Term
  - name: Long-Term
  - name: Conclussions

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
---

## Context:

Copper, often called “the metal of the future,” given its usage in green energy technologies, has seen a significant price rally in 2024, with its value increasing by about 15% this year alone. This price jump has far-reaching implications for global markets and economies, particularly those reliant on copper exports, like Chile. So, what’s driving this surge, and how persistent is it likely to be?

---

## Short-Term Drivers

### What’s Causing the Price Increase?

Several interconnected factors are fueling the rise in copper prices:

- Supply Constraints in a High-Demand World
  Copper’s critical role in the energy transition—think electric vehicles, renewable energy infrastructure, and electrification—has driven demand to unprecedented levels. Meanwhile, supply constraints, including declining global inventories and narrow refining margins, have created a scarcity reflected in the market.

- Geopolitical and Speculative Pressures
  Sanctions on Russian copper storage in the London Metal Exchange and increased speculative trading have further tightened supply.

- Broader Trends in Metals and Risky Assets
  Copper isn’t alone. Other metals and risky assets have also experienced price increases this year, influenced by factors like “green demand” shocks tied to the energy transition and economic resilience in key markets like the U.S., China, and India.

- Economic Resilience and Growth
  The strength of the U.S. economy, China’s steadier-than-expected growth of around 5%, and India’s rising role as a global growth engine have boosted confidence in copper and other strategic commodities.

---

## Long-Term Drivers

### Will These High Prices Persist?

The persistence of copper’s price rally depends on the factors driving it. Specific drivers like increased risk appetite and speculative pressures are expected to be transitory. In contrast, others—such as demand from the energy transition and economic growth in emerging markets—are likely to sustain higher prices in the medium term. We applied a Bayesian Sign-Restriction VAR to the copper market to disentangle this effect. Identifying that mainly demand related to fundamentals should be permanent, raising the medium-term price outlook around 10%

<div style="width: 70%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/Copper_semi_structural.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

As a Benchmark, Forecasts suggest that more than half of the recent price increase will persist, with medium-term prices revised from $3.85 to $4.30 per pound for 2024-2026. Market consensus and government outlooks align with this expectation, showing upward revisions between 6% to 14% since early 2024.

---

## Looking Ahead

The rise in copper prices underscores the metal’s critical role in the global energy transition and economic growth. The current forecast reflects an optimistic medium-term outlook, but the evolving dynamics of supply, demand, and geopolitical factors warrant close monitoring. For now, economies tied to copper production can expect a boost.
