// https://www.dropbox.com/developers/documentation/http/documentation
require('dotenv').config();

const ENDPOINT_ROOT = 'https://api.dropboxapi.com/2'

const ENDPOINT_PATHS = {
  listFolder: '/files/list_folder'
}

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.DROPBOX_BEARER_TOKEN}`
}

const buildEndpoint = action => (ENDPOINT_ROOT + ENDPOINT_PATHS[action])

const buildRequest = ({ action, params }) => {
  const endpoint = buildEndpoint(action)
}

const parseResponse = ({}) => {}

const requestDropbox = ({ action, params }) => {
  const request = buildRequest({ action, params })

  // make request

  return parseResponse(response)
}