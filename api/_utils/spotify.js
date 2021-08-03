const axios = require('axios')
const { createError } = require('micro')

getToken = async (id) => {
  try {
    const { data } = await axios.get(`https://open.spotify.com/show/${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15'
      }
    })
    const match = /"accessToken":"([\w-]+)"/.exec(data)
    return match[1]
  } catch (error) {
    console.error(error)
    throw createError(500, 'Unable to get token')
  }
}

getShow = async (showID) => {
  token = await getToken(showID)
  try {
    const variables = {
      uri: `spotify:show:${showID}`,
      offset: 0,
      limit: 50
    }
    const url = `https://api-partner.spotify.com/pathfinder/v1/query?operationName=queryShowEpisodes&variables=${encodeURI(JSON.stringify(variables))}&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2235e9228b820560520588600a612b4319d25e850e9f26f9e5f3056471c7f82c42%22%7D%7D`
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data.data.podcast
  } catch (error) {
    console.error(error)
    throw createError(500, 'Unable to load show')
  }
}

module.exports = {
  getToken,
  getShow
}
