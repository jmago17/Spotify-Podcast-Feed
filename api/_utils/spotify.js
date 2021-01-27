const axios = require('axios')
const { createError } = require('micro')
const querystring = require('querystring')

const baseURL = 'https://api.spotify.com/v1/'

const clientID = process.env.clientID
const clientSecret = process.env.clientSecret

if(!clientID || !clientSecret) {
  throw new Error('Client ID or Secret missing')
}

let accessToken

getAccessToken = async () => {
  if (accessToken) {
    return accessToken
  }

  try {
    const { data } = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({ 'grant_type': 'client_credentials' }), {
      auth: {
        username: clientID,
        password: clientSecret
      }
    })
    accessToken = data.access_token
    return accessToken
  } catch (error) {
    console.error(error)
    throw createError(500, 'Unable to login')
  }
}

getShow = async (showID) => {
  accessToken = await getAccessToken()
  try {
    const { data } = await axios.get(`${baseURL}shows/${showID}?market=DE`, {
      headers: {
        'Authorization': `Bearer ${accessToken}` 
      }
    })
    return data
  } catch (error) {
    console.error(error)
    throw createError(500, 'Unable to load show')
  }
}

module.exports = {
  getAccessToken,
  getShow
}