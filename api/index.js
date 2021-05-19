import Podcast from 'podcast';
const { send } = require('micro')
const spotify = require('./_utils/spotify')

const regex = new RegExp(/^\w{22}$/)

module.exports = async (req, res) => {
  try {
    if (regex.test(req.query.id) === false) {
      throw new Error('Invalid show id')
    }

    const show = await spotify.getShow(req.query.id)

    const feed = new Podcast({
      title: show.name,
      description: show.description,
      itunesSummary: show.description,
      // siteUrl: show.external_urls.spotify,
      author: show.publisher.name,
      itunesAuthor: show.publisher.name,
      // language: show.languages[0],
      imageUrl: show.coverArt.sources[2].url,
      itunesImage: show.coverArt.sources[2].url,
      ttl: 7200,
      pubDate: new Date(show.episodes.items[0].episode.releaseDate.isoString),
      generator: "Spotify-Podcast-Feed",
    })

    show.episodes.items.forEach(item => {
      const element = item.episode
      const audio = element.audio.items.find((i) => i.externallyHosted)
      feed.addItem({
        title: element.name,
        itunesTitle: element.name,
        description: element.description,
        itunesSummary: element.description,
        url: audio.url,
        guid: element.uri,
        date: new Date(element.releaseDate.isoString),
        itunesDuration: element.duration.totalMilliseconds / 1000,
        itunesImage: element.coverArt.sources[2].url,
        enclosure: {
          url: audio.url,
          duration: element.duration.totalMilliseconds / 1000,
          type: 'audio/mpeg'
        }
      })
    });

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.end(feed.buildXml('\t'))
  } catch (err) {
    console.error(err)
    send(res, err.statusCode || 500, {
      message: err.message || 'unexpected error'
    })
  }
}
