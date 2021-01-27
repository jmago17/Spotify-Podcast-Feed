import Podcast from 'podcast';
const { send } = require('micro')
const spotify = require('./_utils/spotify')

module.exports = async (req, res) => {
  try {
    const show = await spotify.getShow(req.query.id)

    const feed = new Podcast({
      title: show.name,
      description: show.description,
      itunesSummary: show.description,
      siteUrl: show.external_urls.spotify,
      author: show.publisher,
      itunesAuthor: show.publisher,
      language: show.languages[0],
      imageUrl: show.images[0].url,
      itunesImage: show.images[0].url,

      ttl: 7200,
      pubDate: new Date(show.episodes.items[0].release_date),
      generator: "Spotify-Podcast-Feed",
    })

    show.episodes.items.forEach(element => {
      const id = element['audio_preview_url'].substring(element['audio_preview_url'].lastIndexOf('/') + 1)
      feed.addItem({
        title: element.name,
        itunesTitle: element.name,
        description: element.description,
        itunesSummary: element.description,
        url: `https://anon-podcast.scdn.co/${id}`,
        guid: element.uri,
        date: new Date(element.release_date),
        itunesDuration: element.duration_ms / 1000,
        itunesImage: element.images[0].url,
        enclosure: {
          url: `https://anon-podcast.scdn.co/${id}`,
          duration: element.duration_ms / 1000,
          type: 'audio/mpeg'
        }
      })
    });

    res.end(feed.buildXml('\t'))
  } catch (err) {
    console.error(err)
    send(res, err.statusCode || 500, {
      message: err.message || 'unexpected error'
    })
  }
}
