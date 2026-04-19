---
layout: distill
title: DiD Is Not Just One Method — Why Staggered Programs Need a Better Yardstick
description: In the world of data science, this "staggered rollout" is a goldmine for research, but it’s also a trap. If we use old-school shortcuts to measure success, we often end up with the wrong answer.
tags: Analytics Explainability Economy
giscus_comments: true
date: 2026-02-18
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
  - name: The Classic DiD - A Simple World
  - name: The Tempting Shortcut - Two-Way Fixed Effects (TWFE)
  - name: The Fix - The Sun–Abraham Correction
  - name: What’s next?
---

## Context

When a new policy like the **Community Eligibility Program (CEP)** rolls out, it doesn’t happen everywhere at once. Some schools sign up immediately, others wait a few years, and some may never join.

In the world of data science, this "staggered rollout" is a goldmine for research, but it’s also a trap. If we use old-school shortcuts to measure success, we often end up with the wrong answer. This post explains why the "classic" way of measuring impact breaks down and how a newer method, the _Sun–Abraham correction_, gives us the truth.

---

## The Classic DiD - A Simple World

The most common way to measure a policy’s impact is called Difference-in-Differences (DiD).Imagine two groups: a "Treated" group (schools that get CEP) and a "Control" group (schools that don't). We look at the gap between them before the program and the gap after. If the gap grows, we attribute that change to the program.The standard regression version is:

$$Y_{it} = \alpha + \beta \cdot \text{Treated}_i + \gamma \cdot \text{Post}_t + \delta \cdot (\text{Treated}_i \times \text{Post}_t) + \varepsilon_{it}$$

- $$Y_{it}$$ is the outcome for school $$i$$ in year $$t$$
- $$\delta$$ is the DiD effect: the "change in the gap" or the causal effect

**Classic DiD Implementation: 2 Groups and 2 Periods**

<div style="width: 70%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/Classic_DiD.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>Classic DiD Implementation: 2 Groups and 2 Periods</figcaption>
</div>

**Why this isn't enough for CEP:**

Classic DiD assumes everyone is treated at the exact same time. But CEP is staggered. If you try to force a staggered rollout into this simple "before vs. after" box, you end up mixing schools that have had the program for five years with those that just started yesterday.

---

## The Tempting Shortcut: Two-Way Fixed Effects (TWFE)

To handle different start dates, researchers often use a model called Two-Way Fixed Effects (TWFE). It’s designed to "control" for things that make schools different and for things that change over time (like a statewide policy change).

The standard TWFE DiD regression is:

$$Y_{it} = \alpha_i + \lambda_t + \delta D_{it} + \varepsilon_{it}$$

- $$\alpha_i$$: school fixed effects
- $$\lambda_t$$: year fixed effects
- $$D_{it}$$: indicator that school $i$ participates in CEP in year $$t$$
- $$\delta$$: interpreted as the “average treatment effect

**Classic TWFE Implementation: Multiple cohorts staggered together**

<div style="width: 70%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/Classic_TWFE.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>Classic TWFE Implementation: Multiple cohorts staggered together. This time we are looking at the effect  before and after treatment (0) for all groups at the same time </figcaption>
</div>
This time we are looking at the effect  before and after treatment (0) for all groups at the same time.

**”The "Forbidden Comparison" Problem:**
Here is where it gets messy. In a staggered rollout, the computer needs a "control group" for every school. Sometimes, it runs out of schools that haven't been treated yet. When that happens, the model starts using early adopters (who already have the program) as the control group for late adopters.

**The Problem:**
A school already receiving CEP isn't a "clean" control. If the program's impact grows over time—say, attendance improves more in year three than in year one—using an early adopter as a baseline will actually "contaminate" the results, making the program look less effective (or even harmful) than it actually is.

---

## The Fix - The Sun–Abraham Correction

Economists Liyang Sun and Sarah Abraham proposed a clever fix: **don't mix the cohorts**.Instead of throwing every school into one big pot, the Sun–Abraham method follows a "bottom-up" approach. It estimates effects separately by cohort and event time:

$$Y_{it} = \alpha_i + \lambda_t + \sum_{g}\sum_{k \neq -1} \beta_{gk} \mathbf{1}[G_i=g] \cdot \mathbf{1}[t-g=k] + \varepsilon_{it}$$

- $$\beta_{gk}$$ is the effect for cohort $$g$$ at relative time $$k$$
- $$k=-1$$ is typically omitted as the reference (“last pre-treatment year”)

Sun-Abraham Implementation: Estimations by cohorts:

<div style="width: 70%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/Sun_Abraham_classic.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>. Early adopters are not consider for later adopters. They correspond to different cohorts </figcaption>
</div>
Early adopters are not consider for later adopters. They correspond to different cohorts.

Then, to report one overall event-study curve, Sun–Abraham aggregates these estimates:

$$\beta_k = \sum_g w_{gk}\beta_{gk} \quad \text{where} \quad \sum_g w_{gk}=1$$

This keeps comparisons clean by ensuring treated units aren’t serving as contaminated controls for later-treated units. Making it ideal to analyze policy program that follows a staggered rollout behavior.

---

## What’s next?

Now that we have the right tools, it's time to look at the data. In my next post, I will share the actual causal results of CEP adoption—stay tuned to see how free school meals impacted student outcomes.

---
