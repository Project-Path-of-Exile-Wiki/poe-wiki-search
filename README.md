<img src="src/icons/icon_152.png"/>

# Baldur's Gate 3 Wiki search

This is a fork of the [Path of Exile Wiki Search Extension](https://github.com/Project-Path-of-Exile-Wiki/poe-wiki-search), credits go to [pm5k](https://github.com/pm5k) and the PoE community.

This is a browser extension designed to be used in Firefox, Google Chrome, and chromium-based browsers (such as MS Edge) by players of the popular CRPG - [Baldur's Gate 3](https://baldursgate3.game/).
The purpose of this extension is to provide two benefits:

- An easy to use hotkeyed trigger (`Alt+A`, defined in the `"commands"` section in `src/manifest.json`) to enable users to search for information about the game using the [community wiki](www.bg3.wiki).

- As part of an ongoing outcry over the old wiki `baldursgate.fandom.com` employing user-hostile and predatory approaches via tracking, fingerprinting and advertising, this extension intercepts any request your browser sends to Fandom's domain for `Baldur's Gate 3` related queries (all other fandom wikis are not affected, neither are any other web page requests) and parses out the target of your journey (A.K.A what section of the fandom wiki you were going to) and directs you to the official community wiki instead, leaving you to land on the same exact page you were after, just in a friendlier, community-backed wiki.

# Dev quickstart

## Recommended setup

- [pnpm](https://pnpm.io/) (although you can use npm or yarn)
- [web-ext](https://github.com/mozilla/web-ext)

PNPM is just in my experience a way better package manager in that it not only supports monorepos better, it also sanely handles packages via linking whereby your individual projects do not ever have to pull a useless copy of a package down unless it's a new version. It saves on space and `node_modules/` bloat. They do a better job of explaining this than I can, so please [read about it here](https://pnpm.io/faq).

WEB-EXT is a neat little dev runner for Mozzila extensions (requires Firefox to be installed) so you can live test your work - as you work.
It runs as a process and reloads the extension live as you make changes to your source code. Neat!

## Installation steps

- `npm i -g pnpm` <-- the last time you'll ever use NPM if you decided to switch to PNPM.
- `git clone <this repo or fork>`
- `pnpm i -g web-ext`
- `cd` into the cloned repo.
- `pnpm install`
- Setup your vscode to format via ESLint on save. In `.vscode/settings.json` - `"editor.codeActionsOnSave": { "source.fixAll.eslint": true }`
- In two terminals run: `pnpm run test:watch` and `pnpm run start`

Now every time you make changes to the code, you'll see them live on Firefox. Unless you do something browser-specific in the code, your
extension should just work almost everywhere!

## Build

To build your extension for publishing, simply run `pnpm run build`. The packaged zip file will be output to `build/`.

## Testing

We use Jest for testing. Run `pnpm run test` or `pnpm run test:watch`.

# FAQ

## Is this extension safe?

Yes, it is. We do not enforce its use, we provide it as a means to simplify your life when searching for Baldur's Gate 3 related information and as a means to globally redirect your requests to the official wiki, instead of the ad-ridden Fandom site. The code that does this sits in two places:

- `src/background/background.js`
- `src/ui/ui.js`

Each file has a laymanised comment stack to walk even non-technical users through what it does and why. Don't be shy and read through!

## Do you collect any data?

Absolutely not. This extension does not need anything from you to work. The only thing it does is tell your browser to let it know when you click on any fandom link, and if this happens, it asks your browser to instead take you to the new community wiki. No other information is read, asked for or needed. At all.

## I found a bug, what do I do?

[Raise your issues here!](https://github.com/cliesens27/bg3-wiki-search)

## I want to contribute, how do I do this?

Just fork the repo, add your changes and submit a PR!

## Are you planning to add any other features?

Not sure yet. We would like to add the same redirection for the FextraLife wiki as for the Fandom one, for similar reasons, and also because it's blocked for most VPN users. Improving the wiki redirection is another goal, which would mostly mean making it more tailored to the Baldur's Gate 3 wiki, as it currently copies exactly the behaviour of the PoE Wiki Search Extension.
