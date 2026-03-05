#!/usr/bin/env node

const ghpages = require('gh-pages');
const path = require('path');

const { execSync } = require('child_process');

// Find git executable
let gitPath = 'git';
try {
  gitPath = execSync('where git').toString().trim().split('\n')[0];
} catch (e) {
  console.warn('Could not find git path, using default "git"');
}

console.log('Using git from:', gitPath);

ghpages.publish(
  path.join(__dirname, 'build'),
  {
    branch: 'gh-pages',
    repo: 'https://github.com/brillbray/brillPortfolioWeb.git',
    message: 'Deploy to GitHub Pages',
    git: gitPath
  },
  (err) => {
    if (err) {
      console.error('Deployment failed:', err);
      process.exit(1);
    } else {
      console.log('Deployment succeeded!');
      process.exit(0);
    }
  }
);
