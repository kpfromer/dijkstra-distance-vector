# template-typescript-cli

A barebones file structure for creating a cli package (on npm) in TypeScript.

### Other Templates

- [TypeScript Barebones Project](https://github.com/kpfromer/template-typescript-barebones)
- [TypeScript NPM Package](https://github.com/kpfromer/template-typescript-npm-package)
- [TypeScript Mono Repo](https://github.com/kpfromer/template-typescript-mono-repo)

## Includes

- [eslint](https://github.com/eslint/eslint)
- [jest](https://github.com/facebook/jest) for testing
- A GitHub workflow file for continuous testing and npm publishing
- [semantic-release](https://github.com/semantic-release/semantic-release) for a fully automated
  release (using semantic versioning)
- [prettier](https://github.com/prettier/prettier), [husky](https://github.com/typicode/husky),
  [lint-staged](https://github.com/okonet/lint-staged) for automatic formatting and linting

## Scripts

- `npm start` for starting `src/index.ts` (might want to remove this and `ts-node` depending on
  package)
- `npm run test` for jest testing
- `npm run test:watch` for watching files using jest
- `npm run build` for building TypeScripts to `lib` folder
- `npm run lint` runs `eslint`
- `npm run format` runs `prettier`

## Resources

- [Kent C. Dodds article on general tips and unit testing](https://kentcdodds.com/blog/tips-for-making-a-cli-based-tool-with-node).

## License

This project is licensed with the MIT license.
