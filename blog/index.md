---
layout: page
title: 블로그
permalink: /blog/
---

이 블로그는 아카이브 운영 과정, 데이터 수집 현황, 방법론 설명, 정정 및 갱신 이력을 기록합니다.

<ul class="post-list">
  {% for post in site.posts %}
  <li class="post-list-item">
    <div class="post-date">{{ post.date | date: "%Y년 %m월 %d일" }}</div>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    {% if post.excerpt %}
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
