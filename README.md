<img src="src/icons/icon_152.png"/>

# Path of Exile Wiki search

This is a browser extension designed to be used in Firefox, Google Chrome, and chromium-based browsers (such as MS Edge) by players of the popular ARPG - [Path of Exile](www.pathofexile.com).
The purpose of this extension is to provide two benefits:

- An easy to use hotkeyed trigger (`ALT+W`) to enable users to search for information about the game using the [official community wiki](www.poewiki.net).

- As part of an ongoing outcry over the old wiki `pathofexile.fandom.com` employing user-hostile and predatory approaches via tracking, fingerprinting and advertising, this extension intercepts any request your browser sends to Fandom's domain for `path of exile` (all other fandom wiki's are not affected, neither are any other web page requests) and parses out the target of your journey (A.K.A what section of the fandom wiki you were going to) and directs you to the official community wiki instead, leaving you to land on the same exact page you were after, just in a friendlier, community-backed wiki.

# FAQ

## Is this extension safe?

Yes, it is. We do not enforce its use, we provide it as a means to simplify your life when searching for PoE related information and as a means to globally redirect your requests to the official wiki, instead of the ad-ridden Fandom site. The code that does this sits in two places:

- `src/background.js`
- `src/ui/ui.js`

Each file has a laymanised comment stack to walk even non-technical users through what it does and why. Don't be shy and read through!

## Do I _NEED_ this extension?

No, you can use whatever you like. This is for people who want to optimise their wiki searches.

## Do you collect any data?

Absolutely not. This extension does not need anything from you to work. The only thing it does is tell your browser to let it know when you click on any fandom link, and if this happens, it asks your browser to instead take you to the new community wiki. No other information is read, asked for or needed. At all.

## I found a bug, what do I do?

[Raise your issues here!](https://github.com/Project-Path-of-Exile-Wiki/poe-wiki-search/issues)

## I want to contribute, how do I do this?

Just fork the repo, add your changes and submit a PR to us!

## Will this extension become bigger?

Not sure yet. For now the two most important things are implemented. Everything else is a secondary concern compared to work being put into the wiki itself. We may find more functionality we wish to add to this in the future.

## Are you going to maintain this?

Yes, as long as the wiki is up, this should be something we actively maintain. Although it does not need much maintenance. It's a VERY small extension for now. :)

# TODO:

- Add dev setup instructions
- Add laymanised comments in code so users can see for themselves how it all works!
- Pack and host on Chrome and FF stores!
- Use vigorously.
