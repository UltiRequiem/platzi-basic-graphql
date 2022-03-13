# Basic GraphQL Course

> [Take the course!](https://platzi.com/cursos/graphql)

While the course is pretty outdated and IMO uses some bad practices 😩, I learnt
the basics of GraphQL.

While try to use it in my next projects!

Also fix
[UltiRequiem/ddlc_api#6](https://github.com/UltiRequiem/ddlc_api/issues/6)

> The course was done using plain Javascript, but I feel more used to TypeScript
> sooo 😆

## Start

Check the `.env.example` file, you will need a MongoDB URI, you can get it from
an online service or just run it on local 🚀

Chose any DB Name you want, and set `NODE_ENV` to `production` or `development`.

> [pnpm](https://pnpm.io) is the package manager used.

Production

```sh
pnpm start-build
```

Development

```sh
NODE_OPTIONS='--es-module-specifier-resolution=node' pnpm dev-node
```

If you check the [`package.json`](./package.json) there are a lot of scripts,
the setup was a lot simpler, but I wanted to use
[top-level await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#top-level-await)
so to do that I need to use type module, some tools, like `ts-node` or derivate,
doesn't support ESM yet.

## Stack

- Express

- GraphQL

- MongoDB

## License

Licensed under the MIT License.
