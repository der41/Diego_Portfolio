---
layout: distill
title: Is Time All That Matters in Recommendations?
description: A short look at what I learned while stress-testing SLi-Rec on generalization, domain transfer, diversity, and graph context.
tags: AI ML Analytics
giscus_comments: true
date: 2026-01-18
featured: false

authors:
  - name: Diego Rodriguez
    url:
    affiliations:
      name: Duke University

bibliography: false

toc:
  - name: Context
  - name: The Four Stress Tests
  - name: What Actually Moved the Model
  - name: Why I Think This Matters
---

## Context

One thing I like about recommender systems is that they look simple right up until you ask a practical question.

Not "can the model predict the next item?" but questions like these:

- What happens if the data gets smaller?
- What happens if users move into a new category?
- What happens if we want recommendations to feel less repetitive?
- What happens when time alone is not enough context?

That is what made this project interesting to me.

I worked on top of the **SLi-Rec** implementation from Microsoft’s [`recommenders`](https://github.com/recommenders-team/recommenders) repository and used the Amazon Reviews 2023 dataset to push it through four different stress tests. The baseline model is already strong at combining short-term and long-term user preferences, so the real question was not whether it works. The question was **where it breaks, and what actually helps**.

The project ended up becoming a useful reminder that recommendation quality is not just about sequence modeling. It is also about data representativeness, domain fit, exploration strategy, and whether the model knows anything about item relationships beyond interaction order.

If you want the full technical version, the repository is here: [Context-Aware-Recommendation-Systems](https://github.com/MIDS-Hedgehog/Context-Aware-Recommendation-Systems).

---

## The Four Stress Tests

### 1. Generalization under smaller samples

The first experiment was the most reassuring one.

I expected performance to degrade steadily as the model saw less data. Instead, SLi-Rec stayed surprisingly stable. Across different sample sizes and sampling strategies, performance remained near `0.88` AUC as long as the sample stayed representative of the full population.

That does not mean data size does not matter. Training time still increased roughly linearly with more data. But it does suggest something important: **representative data can matter more than simply throwing volume at the model**.

For me, this was one of the cleanest findings in the project. In practical settings, if you can maintain coverage of the real user behavior distribution, you may not need the entire dataset to get strong ranking performance.

The figure below captures the intuition well. Once the data becomes sufficiently rich, the model improves quickly and then begins to stabilize.

<div style="width: 84%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/data_sample_size.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>Performance improves with richer data coverage, reinforcing the point that SLi-Rec benefits most when the sample is representative rather than merely large.</figcaption>
</div>

### 2. Transfer to unseen categories

This one was much harsher.

When a model trained on one product category was evaluated on a different one without retraining, the results were weak. AUC values varied a lot, roughly from `0.52` to `0.86`, depending on the category and the richness of the data.

That result makes intuitive sense once you step back. Sequential behavior is highly contextual. The way someone browses Movies and TV is not the same as the way someone shops for Health products or Automotive goods. The ordering of interactions carries meaning, but that meaning is not portable by default.

The main lesson here was simple: **SLi-Rec is not a zero-shot transfer model**. If the deployment context changes, retraining is not optional. It is part of the job.

### 3. Diversity through temperature

This was probably the most fun experiment because it changed the system behavior in a very visible way.

I introduced a temperature parameter at inference time to make recommendation probabilities more concentrated or more spread out. This is the same intuition people often use with language models: lower temperature means more deterministic choices, higher temperature means more randomness.

That tradeoff showed up clearly here too.

When temperature increased, recommendations became more exploratory, but the overall AUC dropped by about `7%`, landing near `0.80` in the movie setup I tested. A temperature of `0.1` with a prediction threshold of `13%` gave a relatively good balance in a setting where the user sees `10` options.

What I like about this result is that it makes diversity feel operational rather than philosophical. You do not have to argue abstractly about whether novelty is good. You can tune it depending on the interface and the product goal.

If the user sees one answer, you probably want a sharper distribution. If the user sees a carousel or shortlist, a bit more exploration may be worth the tradeoff.

The visual below is a good example of what that tradeoff looks like in practice. A purely sequential setup can become repetitive, while a slightly more exploratory one surfaces a broader set of useful options.

<div style="width: 92%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/randomness_performance.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>Temperature changes the feel of the recommendations: lower randomness keeps the list narrow, while a controlled increase can introduce more variety into the candidate set.</figcaption>
</div>

### 4. Adding graph context

This was the strongest improvement in the project.

The baseline SLi-Rec model is sequence-aware, but it still relies heavily on historical interaction order. That becomes limiting when the item is new, underrepresented, or poorly covered by recent user behavior. So I extended the setup with **LightGCN-based item embeddings** and fused those graph signals into the final recommendation stage.

That hybrid model performed better across the ranking metrics that matter:

- AUC improved from `0.83` to `0.8795`
- MRR improved from `0.4946` to `0.7176`
- NDCG@6 improved from `0.5607` to `0.7725`

To me, that is the most practical takeaway in the whole project. **When time dynamics are not enough, structural item relationships can do a lot of work.**

The model became better at surfacing relevant items earlier, and the lift was especially meaningful in sparse or cold-start-like conditions.

This final figure summarizes why the graph extension mattered. The accuracy lift is modest, but the gains in suggestion quality and speed to a useful item are much larger, which is exactly the kind of change users tend to feel.

<div style="width: 86%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/graph_performance.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>Graph-aware recommendations improved more than raw accuracy alone, especially on measures tied to how quickly useful items surface and how relevant the shortlist feels.</figcaption>
</div>

---

## What Actually Moved the Model

After working through all four experiments, I think the project boiled down to three ideas.

First, **good in-domain data is incredibly powerful**. The generalization experiment showed that SLi-Rec can stay strong even when the sample is smaller, as long as the data is still representative. That is a useful reminder for any applied ML project where people instinctively ask for more data before asking whether the current data is well-shaped.

Second, **domain mismatch is expensive**. The transfer experiment made it clear that sequential recommenders learn behavior patterns that are tightly tied to the environment they were trained in. This is not a model you can casually move across categories and expect to work.

Third, **context is not only temporal**. The graph-augmented model worked because it gave SLi-Rec access to another kind of signal: how items relate to other items in the broader interaction graph. That extra structure helped exactly where the pure sequence signal was weakest.

The diversity experiment sits somewhere in the middle. It did not "improve" the model in the usual benchmark sense, but it made the behavior controllable. I think that matters. A recommender should not only be accurate. It should also be tunable to the experience you want to create.

---

## Why I Think This Matters

What I liked most about this project is that it pushed the conversation away from leaderboard thinking.

A lot of recommendation work gets framed as a race for the best metric. That matters, of course. But in practice, teams care about things like:

- whether a model survives thinner datasets
- whether it needs retraining when the catalog changes
- whether it can balance relevance and exploration
- whether it handles sparse or cold-start scenarios gracefully

Those are deployment questions, not just modeling questions.

For me, the strongest result was not just that the graph-augmented version scored better. It was that each experiment made a different weakness visible. Together, they gave a more honest picture of what SLi-Rec is actually good at.

The short version is this:

- SLi-Rec is strong when the data is representative and in-domain.
- It is weak at zero-shot transfer across categories.
- Diversity can be tuned, but not for free.
- Graph context can materially improve recommendation quality when sequence information is incomplete.

That feels like a much better engineering story than "the model works."

It tells you **when** it works, **why** it fails, and **what** to change next.
