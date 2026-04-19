---
layout: distill
title: Why Independent Fiscal Institutions Matter, Lessons for Latin America
description: A summary of the original paper published on the <a href=https://www.oecd-ilibrary.org/economics/independent-fiscal-institutions_cbeaa057-en>OECD</a>
tags: Economy Latam Fiscal Analytics ML
giscus_comments: true
date: 2024-02-03
featured: false

authors:
  - name: Diego Rodriguez
    url:
    affiliations:
      name: Duke University

bibliography: 2024-02-03-OECD_latam.bib

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
  - name: K-means
  - name: Interviews
  - name: Lessons for LATAM

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

## Context

Let’s talk about independent fiscal institutions (IFIs)—you know, those watchdogs keeping government finances in check. They don’t always get the spotlight but are crucial for ensuring transparency, accountability, and trust in public spending. A recent OECD report dives into how IFIs are structured worldwide and what Latin America can learn from their experiences.

### What Exactly Are IFIs?

Think of IFIs as the fiscal equivalent of referees in a sports game. Their job is to call out overspending, keep forecasts realistic, and ensure budgetary rules aren’t just words on paper. For example, the US has the Congressional Budget Office to share reliable spending and income with the government. But here’s the thing—no two IFIs are the same. To understand their diversity, in this document we use a statistical approach called k-means clustering, an unsupervised machine learning technique, to group IFIs based on their size, mandate, and functions.

---

## K-means

Imagine sorting a big pile of fiscal institutions into groups without knowing much about them beforehand. Clustering looks for patterns in the data—grouping IFIs with similar tasks and resources—while ensuring the groups are as distinct as possible. For example, k-means minimizes differences within a group and maximizes differences between groups by organizing the data around “centroids” (essentially, the center of a group).

Using K-means, four distinct clusters of IFIs are revealed :

{% include figure.liquid loading="eager" path="assets/img/publication_preview/IFIs_2024_Clusters.png" class="img-fluid rounded z-depth-1" zoomable=true %}

1. Small but mighty: These are focused on monitoring compliance with fiscal rules, often with limited resources. Consider them specialists—like Ireland’s Fiscal Advisory Council—keeping governments honest about spending.
2. Medium-sized multitaskers: Adding more complexity to their role, these IFIs assess compliance while conducting policy costing and macroeconomic analysis. Spain’s fiscal council, AIReF, is a prime example.
3. Parliamentary Budget Offices (PBOs): These focus on supporting legislators, responding to specific requests, and performing policy costings. Canada’s PBO, for instance, delivers tailored fiscal analysis directly to parliamentarians.
4. Big players: These are the heavyweights, producing official macroeconomic forecasts and handling complex, resource-intensive tasks. The Netherlands’ CPB Bureau for Economic Policy Analysis is a standout here.

Each type serves its purpose, and its design reflects the fiscal priorities and maturity of the country they are in. For example, smaller IFIs often emerge in nations just starting to focus on fiscal discipline, while larger ones thrive in countries with well-established governance systems. We interviewed good practices in each cluster to understand better what set them apart in their task toward better fiscal policies.

---

## Interviews

### Leaders within each Cluster and lessons learned

What sets successful Independent Fiscal Institutions (IFIs) apart? Drawing from OECD experiences, it comes down to three essential pillars:

Independence is Non-Negotiable
Autonomy is critical for any IFI to thrive. Legal protection, multi-year budgets, and the ability to hire staff independently ensure these institutions are shielded from political influence. Without true independence, IFIs risk being seen as mere extensions of the government, undermining their credibility. Inspired by the Independence of the US Congressional Budget Office, Korea’s National Assembly Budget Office (NABO) began with a limited scope. Over time, it expanded to cover long-term forecasts, program evaluations, and bill costings, supporting the legislature in overseeing the executive branch.

Transparency is a Superpower
IFIs must communicate their findings clearly and accessibly to the public, media, and policymakers. Transparent reports and open dialogue build trust and amplify their impact on fiscal policy. Illustrative is the case of Spain’s AIReF, which faced challenges accessing information in its early days. Through transparent reporting and a broad mandate—including monitoring fiscal rules and conducting policy costing—it built a strong reputation as a reliable and independent institution

Start Small, Then Grow
Many successful IFIs began with narrowly focused mandates, gradually expanding as they built credibility and capacity. Chile, for instance, transitioned from an advisory council to a fully autonomous fiscal council in 2019. This shift enabled it to address pressing issues, including budgetary sustainability and public trust, especially during economic strain like the COVID-19 pandemic.

---

## Lessons for LATAM

What This Means for Latin America
Post-COVID, many Latin American countries are grappling with high debt and tighter budgets. Stronger IFIs can help manage this crisis by promoting responsible policies and rebuilding trust.

Start small, but aim high. Begin with a clear, narrow mandate, then expand as credibility grows. Stay and defend the independent framework. Legal and operational autonomy should be baked into the design and long-term planning. Communicate, communicate, communicate. Even the best analysis won’t matter if no one understands or trusts it. Latin America has a significant opportunity to learn from global best practices and set up IFIs that genuinely make a difference. Because when public finances are transparent and accountable, everybody wins.
