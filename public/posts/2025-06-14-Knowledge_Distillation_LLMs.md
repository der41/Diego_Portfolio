---
layout: distill
title: What Happens When You Shrink an LLM?
description: A short look at a project on knowledge distillation, where a much smaller model kept more of the teacher's performance than I expected.
tags: AI LLMs NLP Engineering
giscus_comments: true
date: 2025-06-14
featured: false

authors:
  - name: Diego Rodriguez
    url:
    affiliations:
      name: Duke University

bibliography: false

toc:
  - name: Context
  - name: What the setup looks like
  - name: What we found
  - name: What changed with RL
  - name: Why it matters
---

## Context

One of the biggest frustrations with large language models is that the strongest ones are often the hardest to deploy. They need more memory, more compute, and more patience.

That is what made this project interesting to me. The question was simple: **can a much smaller model keep enough of the teacher's quality to still be useful?**

To test that, we built a knowledge distillation pipeline across three settings: English, Spanish, and code generation. The setup started with larger teacher models, including GPT-2 `1.5B`, and trained smaller students to imitate their behavior in a much lighter package.

If you want to see the implementation, the repository is here: [Distill_LLM](https://github.com/der41/Distill_LLM).

---

## What the setup looks like

At a high level, the idea is straightforward. A larger **teacher** model sees the labeled data, produces soft predictions, and a smaller **student** model learns from both the original target and the teacher's behavior.

That sounds abstract, but the diagram below captures it well. The teacher is already strong, the student is much lighter, and the distillation loss is what transfers part of that capability.

<div style="width: 78%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/distillation_framework.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>Knowledge distillation setup: a pre-trained teacher guides a smaller student through soft-label learning.</figcaption>
</div>

What I like about this framing is that it turns model compression into a practical engineering question rather than a purely academic one: how much quality can you preserve while making the model much easier to run?

---

## What we found

The main result was stronger than I expected.

On English tasks, a GPT-2 `125M` student retained about `75%` of the teacher's Rouge-L performance. That is a meaningful amount of quality for a model that is dramatically smaller and easier to run.

On Spanish tasks, the result was even more encouraging. The distilled student reached within `95%` of teacher Rouge-L while using only about `10%` of the teacher's parameters. It also beat a supervised-only baseline by up to `10%` in the early part of training.

The figure below makes that result easier to read. On the left, the knowledge-distilled model keeps pushing training loss down while the supervised-only run flattens earlier. On the right, Rouge-L climbs higher for KD and ends much closer to the teacher benchmark.

<div style="width: 92%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/kd_spanish.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>Spanish distillation results: KD converges to lower loss and finishes with stronger Rouge-L than supervised fine-tuning alone.</figcaption>
</div>

To me, this was the clearest signal in the project. Distillation was not just a neat compression trick. In the Spanish setting, it was a better learning strategy than plain supervised fine-tuning.

---

## What changed with RL

We also extended the setup to code generation. There, the most interesting finding was that distillation became more useful when we paired it with guided Chain-of-Thought and GRPO. The model produced more coherent reasoning traces and stronger answers than knowledge distillation alone.

This last figure shows that transition. The left panel tracks KL divergence and loss as the model moves away from its original short-form behavior. The right panel shows the reward functions stabilizing at a higher level, which is what we want when training for more structured reasoning.

<div style="width: 92%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/rltraining.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  <figcaption>RL with guided Chain-of-Thought: rewards rise and stabilize as the model learns longer, better-structured reasoning traces.</figcaption>
</div>

It is not magic, and it is definitely not free. But it does show that a small model can be pushed further when distillation is combined with the right behavioral training objective.

---

## Why it matters

The short version is this: **smaller models do not have to mean weak models**.

This project reinforced something I keep seeing in applied AI work. A lot of value comes not just from using a bigger model, but from building the right training setup around it. Distillation helps transfer capability. Reinforcement learning helps shape behavior. And together, they can make a compact model much more practical for real use.

That matters when latency, compute cost, or hardware limits are part of the problem. In those cases, a smaller well-trained model can be more valuable than a larger one that is expensive to serve.

For me, this project was a good reminder that efficiency is not a side concern in machine learning. It is part of the product.
