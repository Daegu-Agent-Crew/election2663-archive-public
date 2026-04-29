---
layout: default
title: 대구시장 선거 2026
---

<div class="container">
  <div class="home-hero">
    <h1>대구광역시장 선거 2026<br>공개 정보 아카이브</h1>
    <p>
      2026년 6월 3일 실시되는 대구광역시장 선거와 관련된 공개 정보를 수집·보존하고,
      출처가 명확한 wiki로 제공합니다. 특정 후보나 정당을 지지하지 않습니다.
    </p>
    <span class="home-notice">수집 진행 중 — 내용이 계속 갱신됩니다</span>
  </div>

  <div class="election-dates">
    <h2>선거 주요 일정 <small style="font-weight:400;color:#888;font-size:0.85rem">중앙선거관리위원회 기준</small></h2>
    <ul class="date-list">
      <li><strong>후보자 등록</strong>2026년 5월 14일–15일</li>
      <li><strong>선거기간 개시</strong>2026년 5월 21일</li>
      <li><strong>사전투표</strong>2026년 5월 29일–30일</li>
      <li><strong>선거일</strong>2026년 6월 3일</li>
    </ul>
  </div>

  <div class="section-title">Wiki 바로가기</div>
  <div class="home-grid">
    <a class="home-card" href="{{ '/wiki/candidates/' | relative_url }}">
      <h3>후보자</h3>
      <p>후보자별 경력, 공약, 발언, 논란을 출처와 함께 정리합니다.</p>
    </a>
    <a class="home-card" href="{{ '/wiki/issues/' | relative_url }}">
      <h3>이슈</h3>
      <p>교통, 주거, 청년, 복지, TK신공항 등 대구의 주요 선거 쟁점을 다룹니다.</p>
    </a>
    <a class="home-card" href="{{ '/wiki/policies/' | relative_url }}">
      <h3>정책 &middot; 공약</h3>
      <p>후보별 공약과 정책을 동일한 기준으로 비교합니다.</p>
    </a>
    <a class="home-card" href="{{ '/wiki/election-calendar' | relative_url }}">
      <h3>선거 일정</h3>
      <p>후보 등록, 선거운동 기간, 투표일 등 공식 일정을 정리합니다.</p>
    </a>
    <a class="home-card" href="{{ '/wiki/polls/' | relative_url }}">
      <h3>여론조사</h3>
      <p>조사기관, 의뢰기관, 표본, 오차범위와 함께 여론조사 결과를 기록합니다.</p>
    </a>
    <a class="home-card" href="{{ '/wiki/timeline' | relative_url }}">
      <h3>타임라인</h3>
      <p>날짜별 주요 사건을 출처와 함께 정리합니다.</p>
    </a>
  </div>

  <div class="section-title">최근 블로그</div>
  <ul class="post-list">
    {% for post in site.posts limit:3 %}
    <li class="post-list-item">
      <div class="post-date">{{ post.date | date: "%Y년 %m월 %d일" }}</div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      {% if post.excerpt %}
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
  <p><a href="{{ '/blog/' | relative_url }}">블로그 전체 보기 &rarr;</a></p>
</div>
