import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const required = ['GITHUB_TOKEN', 'HOF_OWNER', 'HOF_REPO', 'HOF_BASE_SHA', 'HOF_HEAD_SHA'];
const missing = required.filter(key => !process.env[key]);

if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const token = process.env.GITHUB_TOKEN;
const owner = process.env.HOF_OWNER;
const repo = process.env.HOF_REPO;
const base = process.env.HOF_BASE_SHA;
const head = process.env.HOF_HEAD_SHA;
const changelogNotes = process.env.HOF_CHANGELOG_NOTES || 'No changelog notes were provided.';
const compareUrl = `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`;

const outputJsonPath = process.env.HOF_SYNC_CONTEXT_JSON || '.tmp/hof-sync/context.json';
const outputReportPath = process.env.HOF_SYNC_REPORT_MD || '.tmp/hof-sync/report.md';

const response = await fetch(compareUrl, {
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

if (!response.ok) {
  throw new Error(`Failed to fetch compare data (${response.status}): ${await response.text()}`);
}

const compare = await response.json();
const files = Array.isArray(compare.files) ? compare.files : [];
const commits = Array.isArray(compare.commits) ? compare.commits : [];

const docSurfaceMap = [
  { pattern: /^controller\//, docs: ['extending-hof/controller-lifecycle.md'] },
  { pattern: /^wizard\/middleware\//, docs: ['architecture/request-lifecycle.md', 'extending-hof/middleware.md'] },
  { pattern: /^wizard\/behaviours\//, docs: ['behaviours/overview.md', 'behaviours/built-in.md'] },
  { pattern: /^components\//, docs: ['building-services/fields.md', 'behaviours/built-in.md'] },
  { pattern: /^controller\/validation\//, docs: ['building-services/validation.md', 'reference/validators.md'] },
  { pattern: /^controller\/formatting\//, docs: ['reference/formatters.md'] },
  { pattern: /^model\//, docs: ['extending-hof/models.md'] },
  { pattern: /^lib\/sessions\.js$/, docs: ['operations/sessions-and-redis.md'] },
  { pattern: /^lib\/router\.js$/, docs: ['building-services/routes.md', 'architecture/request-lifecycle.md'] },
  { pattern: /^config\//, docs: ['reference/configuration.md', 'operations/security.md'] },
  { pattern: /^bin\/hof-build$/, docs: ['operations/deployment.md', 'getting-started/create-new-hof-service.md'] },
  { pattern: /^CHANGELOG\.md$/, docs: ['migration/upgrading-hof.md'] },
  { pattern: /^README\.md$/, docs: ['getting-started/introduction.md'] }
];

const impactedDocs = new Set();

for (const file of files) {
  const filename = file.filename || '';
  for (const mapping of docSurfaceMap) {
    if (mapping.pattern.test(filename)) {
      for (const doc of mapping.docs) impactedDocs.add(doc);
    }
  }
}

const changedFiles = files.map(file => ({
  filename: file.filename,
  status: file.status,
  additions: file.additions,
  deletions: file.deletions,
  changes: file.changes
}));

const commitSummaries = commits.map(commit => ({
  sha: commit.sha,
  message: commit.commit?.message?.split('\n')[0] || '',
  author: commit.commit?.author?.name || ''
}));

const context = {
  generated_at: new Date().toISOString(),
  framework_repo: `${owner}/${repo}`,
  compare: {
    base,
    head,
    html_url: compare.html_url
  },
  changelog_notes: changelogNotes,
  commit_count: commits.length,
  file_count: files.length,
  commits: commitSummaries,
  changed_files: changedFiles,
  suggested_docs_to_review: [...impactedDocs]
};

const report = `# HOF framework -> guide sync task

## Source

- Framework repository: \`${owner}/${repo}\`
- Compare range: \`${base}...${head}\`
- Compare URL: ${compare.html_url || `https://github.com/${owner}/${repo}/compare/${base}...${head}`}

## Changelog notes

${changelogNotes.trim()}

## Changed commits (${commits.length})

${commitSummaries.map(commit => `- \`${commit.sha.slice(0, 7)}\` ${commit.message}${commit.author ? ` (${commit.author})` : ''}`).join('\n') || '- None'}

## Changed files (${files.length})

${changedFiles.map(file => `- \`${file.filename}\` (${file.status}, +${file.additions}/-${file.deletions})`).join('\n') || '- None'}

## Suggested guide pages to review

${[...impactedDocs].map(path => `- \`${path}\``).join('\n') || '- Manual triage required (no mapping matched)'}

## Agent instructions

Use the \`hof-doc-sync\` skill in this repository and update guide pages based on the real framework diff.
Run \`yarn build\` before opening/updating the PR.
`;

mkdirSync(dirname(outputJsonPath), { recursive: true });
mkdirSync(dirname(outputReportPath), { recursive: true });
writeFileSync(outputJsonPath, `${JSON.stringify(context, null, 2)}\n`);
writeFileSync(outputReportPath, report);

console.log(`Wrote context JSON: ${outputJsonPath}`);
console.log(`Wrote sync report: ${outputReportPath}`);
