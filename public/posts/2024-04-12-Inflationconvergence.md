---
layout: distill
title: Global Inflation Convergence, A Risky Road Ahead
description: Since mid-2022, inflation has been declining across advanced and emerging economies—a welcome, however risk are looming on the horizon. This is a partial translation of the analysis we conducted on the <a href=https://www.bcentral.cl/documents/d/banco-central/minutas_citadas_en_ipom_marzo_2024>minutes cited</a>  on the <a href=https://www.bcentral.cl/documents/33528/5582814/MPR-March-2024.pdf/478ac938-6220-16dc-4b2f-5fa261a0a95b?t=1712951058936>Monetary Policy Report</a> of the CBCH, Mar 2024
tags: Economy Inflation Global Analytics ML
giscus_comments: true
date: 2024-04-12
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
  - name: Drivers
  - name: Emerging Risks
  - name: Uncertain Path Forward

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

### The Recent evolution of Global Inflation

Since mid-2022, inflation has been declining across advanced and emerging economies—a welcome relief in a world grappling with financial pressures. Much of this drop has been attributed to falling goods prices, driven by the resolution of supply chain disruptions, declining transportation costs, and easing commodity prices. However, this path to lower inflation isn't without bumps, especially as several underlying factors begin to shift.

---

## Drivers:

### What’s Driving Inflation Down?

1. Supply Chain Recovery:
   During the pandemic, snarled supply chains and sky-high shipping costs pushed global inflation upward. But as production chains normalized and transportation costs fell, inflationary pressures eased. Analyzing shipping cost and inflation using local projections suggests that shipping cost normalization alone reduced global inflation by about 0.7 percentage points in recent months.

{% include figure.liquid loading="eager" path="assets/img/transportation_cost.png" class="img-fluid rounded z-depth-1" zoomable=true %}

2. Energy Prices Dropping from Peaks:
   Following the 2022 surge in energy prices after Russia invaded Ukraine, global energy markets stabilized, aided by increased non-OPEC+ production and the U.S. releasing its strategic petroleum reserves. The increased crude oil on the market decreased prices and relieved global inflation.

3. China’s Role in Disinflation:
   Weak consumption in China and robust manufacturing output have also contributed to global disinflation, particularly in goods excluding food and energy. By analyzing inflation's underlying dynamics with a Bayesian Sing Restriction VAR, we found that China's economic conditions in the second half of 2023 helped reduce goods inflation in the U.S. by over one percentage point.

{% include figure.liquid loading="eager" path="assets/img/US_inflation_CHN.png" class="img-fluid rounded z-depth-1" zoomable=true %}

---

## Emerging Risks

### There are signs that some deflationary tailwinds may be reversing:

- Rising Transportation Costs:
  New conflicts in the Middle East and the Red Sea are pushing shipping costs higher. These elevated costs could add 0.4 percentage points to global inflation by 2025 if sustained for six months.

- Energy Market Uncertainty:
  With U.S. oil production expected to slow and OPEC+ holding production steady, the outlook for energy supply is less favorable. Any worsening geopolitical tensions could further strain oil markets, increasing prices.

- China’s Fragile Balance:
  The current disinflationary effects of China’s economy hinge on weak domestic consumption and high industrial output. A rebound in consumption or a slowdown in manufacturing could diminish these effects, putting upward pressure on global inflation.

---

## Uncertain Path Forward

The global inflation story has primarily been a tale of goods prices coming down thanks to improved supply-side conditions. However, these deflationary drivers—like normalized shipping costs, energy markets, and China’s economic dynamics—show signs of fading. As these effects wane, the pace at which global inflation converges to target levels could slow, leaving room for new inflationary pressures to emerge. In short, while inflation’s downward trajectory has brought optimism, the risks lurking beneath the surface remind us that the road ahead may still be rocky.
