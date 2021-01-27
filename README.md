# Spotify-Podcast-Feed

The service provides Spotify podcast as RSS feed which can be subscribed in any podcast app.

Service-URL: `https://spotify-podcast-feed.vercel.app/[Show-ID]`

## Usage

Add the show id of the podcast at the end of the service url like: `https://open.spotify.com/show/1OLcQdw2PFDPG1jo3s0wbp => https://spotify-podcast-feed.vercel.app/1OLcQdw2PFDPG1jo3s0wbp`.
This url can be entered in any podcast app to subscribe the podcast.

You can use this iOS Shortcut to generate the Feed-URL via Share-Menu in the Spotify App: [Get Spotify-Podcast-Feed](https://www.icloud.com/shortcuts/759b8278b3794838bb5b9cd7ad3f343d)

## Host via Vercel
If you like to host your own instance of this service via vercel.com, you have to set the following environment variables:

* clientID
* clientSecret

Both are provided after setting up an app in the [Developer Portal](http://developer.spotify.com) of Spotify.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FThisIsBenny%2FSpotify-Podcast-Feed)

## Credits
* @Timdorr for the inspiration (https://github.com/timdorr/spotifeed)
