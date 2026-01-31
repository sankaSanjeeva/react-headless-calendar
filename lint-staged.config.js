export default {
  '*.ts': () => ['pnpm type:check', 'pnpm lint'],
  '*.{json,md}': () => ['pnpm format:check'],
};
