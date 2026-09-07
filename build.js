#!/usr/bin/env node
// 모듈 파일을 합쳐 pack.md(단일 실행 규격)와 manifest.json을 생성합니다.
// 사용: node build.js

const fs = require('fs');
const path = require('path');

const ORDER = [
  'parts/00-header.md',
  'core/core.md',
  'platforms/_intro.md',
  'platforms/blog.md',
  'platforms/threads.md',
  'platforms/x-standard.md',
  'platforms/x-premium.md',
  'platforms/geeknews.md',
  'options/_intro.md',
  'options/declarative.md',
  'options/breaking.md',
  'options/keyword.md',
  'options/verify.md',
  'parts/90-batch.md',
  'parts/95-check.md',
  'parts/99-input.md',
];

// 섹션 사이에 구분선을 넣을 위치
const RULE_BEFORE = new Set([
  'core/core.md',
  'platforms/_intro.md',
  'options/_intro.md',
  'parts/90-batch.md',
  'parts/95-check.md',
  'parts/99-input.md',
]);

const read = (p) => fs.readFileSync(path.join(__dirname, p), 'utf8').trim();

const body = ORDER
  .map((p) => (RULE_BEFORE.has(p) ? '---\n\n' : '') + read(p))
  .join('\n\n');

fs.writeFileSync(path.join(__dirname, 'pack.md'), body + '\n', 'utf8');

const manifest = {
  name: 'article-prompt-pack',
  version: '1.0.0',
  entry: 'pack.md',
  platforms: ['블로그', '쓰레드', 'X일반', 'X프리미엄', '긱뉴스', '전체'],
  options: ['평서체', '속보', '키워드', '검증'],
  modules: ORDER,
  generated: new Date().toISOString().slice(0, 10),
};

fs.writeFileSync(
  path.join(__dirname, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8'
);

const chars = [...body].length;
console.log(`pack.md 생성 완료 — ${ORDER.length}개 모듈, ${chars}자`);
