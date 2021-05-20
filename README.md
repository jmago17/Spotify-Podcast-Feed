# Spotify-Podcast-Feed

A service which provides Spotify podcast as RSS feed, which can be subscribed in any podcast app.

**Notice: there are no longer public audio links for all podcasts that can be used by a podcast player. Only some podcasts are still working.**

Service-URL: `https://spotify-podcast-feed.vercel.app/[Show-ID]`

## Usage

Add the show id of the podcast at the end of the service url like: `https://open.spotify.com/show/1OLcQdw2PFDPG1jo3s0wbp => https://spotify-podcast-feed.vercel.app/1OLcQdw2PFDPG1jo3s0wbp`.
This url can be entered in any podcast app to subscribe the podcast.

As iOS user, you can use this Shortcut to generate the Feed-URL via Share-Menu in the Spotify App: [Get Spotify-Podcast-Feed](https://www.icloud.com/shortcuts/759b8278b3794838bb5b9cd7ad3f343d)

## Host via Vercel
If you like to host your own instance of this service via vercel.com, you can use this Button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FThisIsBenny%2FSpotify-Podcast-Feed)

## Troubleshooting
### URL doesn't work in podcast app
* Some Spotify podcasts are limited to specific marketes (countries). You can add at the end of the url the parameter `market` with the country as [ ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Example: `https://spotify-podcast-feed.vercel.app/1OLcQdw2PFDPG1jo3s0wbp?market=SE`.

## Credits
* @Timdorr for the inspiration (https://github.com/timdorr/spotifeed)
