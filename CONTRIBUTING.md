# Contributing to J Supreme Tech

We appreciate your interest in contributing! Here's how you can help.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/j-supreme-tech.git
   cd j-supreme-tech
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Add your configuration

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Code Standards

- Use TypeScript for all new code
- Follow existing code style
- Add comments for complex logic
- Write meaningful commit messages

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: feat, fix, docs, style, refactor, perf, test, chore

Example:
```
feat(auth): add password reset functionality

Added password reset route and email notification
Implemented token expiration after 24 hours
```

## Testing

```bash
npm run lint          # Run ESLint
npm run build         # Test production build
```

## Pull Request Process

1. Update README if needed
2. Add tests if applicable
3. Ensure build passes: `npm run build`
4. Create descriptive PR title and description
5. Reference any related issues

## Feature Requests

- Open an issue with `feature-request` label
- Describe the feature and use case
- Provide examples if possible

## Bug Reports

- Open an issue with `bug` label
- Include steps to reproduce
- Provide screenshots if applicable
- Include Node.js version and browser info

## Documentation

- Update docs for new features
- Keep code comments clear
- Add examples where helpful

## Need Help?

- Check existing issues and documentation
- Ask in GitHub Discussions
- Email: hello@jsupreme.tech

Thank you for contributing!
