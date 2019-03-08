// Express
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

// Dropbox
require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;

// Environmental Variables
require('dotenv').config();

// CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (origin === 'http://localhost:8080') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Get Dropbox Instance
const DROPBOX_INSTANCE = 'DROPBOX_INSTANCE'
app.set(DROPBOX_INSTANCE, null)
const getDropboxInstance = () => {
  const storedInstance = app.get(DROPBOX_INSTANCE)

  if (!!storedInstance) {
    return storedInstance
  }

  const DROPBOX_ACCOUNT_ACCESS_TOKEN = process.env.DROPBOX_ACCOUNT_ACCESS_TOKEN;
  const DROPBOX_ACCOUNT_CLIENT_ID = process.env.DROPBOX_ACCOUNT_CLIENT_ID;
  const dropboxInstance = new Dropbox({ accessToken: DROPBOX_ACCOUNT_ACCESS_TOKEN, fetch: fetch });
  dropboxInstance.setClientId(DROPBOX_ACCOUNT_CLIENT_ID)
  const authUrl = dropboxInstance.getAuthenticationUrl('http://localhost:8080/auth')
  app.set(DROPBOX_INSTANCE, dropboxInstance)
  return dropboxInstance
}

app.get('/', (req, res) => {

  // http://dropbox.github.io/dropbox-sdk-js/tutorial-Authentication.html
  // https://github.com/dropbox/dropbox-sdk-js/blob/master/examples/javascript/auth/index.html

  const dropboxInstance = getDropboxInstance()
  // List all methods
  console.log(dropboxInstance)

  // Test the GET folder content
  const content = dropboxInstance.filesListFolder({path: ''})
  content.then(response => {
    console.log(response)
  })

  res.send(JSON.stringify(dropboxInstance))
})

app.get('/folder', (req, res) => {
  const pathDecoded = decodeURI(req.query.path)
  const pathTrimmed = pathDecoded[0] === '/' ? pathDecoded : `${'/'}${pathDecoded}`

  const dropboxInstance = getDropboxInstance()
  const dropboxResponse = dropboxInstance.filesListFolder({ path: pathTrimmed })
// return res.send('hello')
  dropboxResponse.then(response => {
    console.log(response)
    return res.send(response)
  })
})

app.get('/folder_next_page', (req, res) => {
  // filesListFolderContinue({ cursor: '' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/* 
  Properties of dbx:

  clientSecret: undefined,
  selectUser: undefined,
  selectAdmin: undefined,
  fetch: [Function],
  pathRoot: undefined,
  authTokenFromOauth1: [Function],
  authTokenRevoke: [Function],
  contactsDeleteManualContacts: [Function],
  contactsDeleteManualContactsBatch: [Function],
  filePropertiesPropertiesAdd: [Function],
  filePropertiesPropertiesOverwrite: [Function],
  filePropertiesPropertiesRemove: [Function],
  filePropertiesPropertiesSearch: [Function],
  filePropertiesPropertiesSearchContinue: [Function],
  filePropertiesPropertiesUpdate: [Function],
  filePropertiesTemplatesAddForTeam: [Function],
  filePropertiesTemplatesAddForUser: [Function],
  filePropertiesTemplatesGetForTeam: [Function],
  filePropertiesTemplatesGetForUser: [Function],
  filePropertiesTemplatesListForTeam: [Function],
  filePropertiesTemplatesListForUser: [Function],
  filePropertiesTemplatesRemoveForTeam: [Function],
  filePropertiesTemplatesRemoveForUser: [Function],
  filePropertiesTemplatesUpdateForTeam: [Function],
  filePropertiesTemplatesUpdateForUser: [Function],
  fileRequestsCreate: [Function],
  fileRequestsGet: [Function],
  fileRequestsList: [Function],
  fileRequestsUpdate: [Function],
  filesAlphaGetMetadata: [Function],
  filesAlphaUpload: [Function],
  filesCopyV2: [Function],
  filesCopy: [Function],
  filesCopyBatchV2: [Function],
  filesCopyBatch: [Function],
  filesCopyBatchCheckV2: [Function],
  filesCopyBatchCheck: [Function],
  filesCopyReferenceGet: [Function],
  filesCopyReferenceSave: [Function],
  filesCreateFolderV2: [Function],
  filesCreateFolder: [Function],
  filesCreateFolderBatch: [Function],
  filesCreateFolderBatchCheck: [Function],
  filesDeleteV2: [Function],
  filesDelete: [Function],
  filesDeleteBatch: [Function],
  filesDeleteBatchCheck: [Function],
  filesDownload: [Function],
  filesDownloadZip: [Function],
  filesGetMetadata: [Function],
  filesGetPreview: [Function],
  filesGetTemporaryLink: [Function],
  filesGetTemporaryUploadLink: [Function],
  filesGetThumbnail: [Function],
  filesGetThumbnailBatch: [Function],
  filesListFolder: [Function],
  filesListFolderContinue: [Function],
  filesListFolderGetLatestCursor: [Function],
  filesListFolderLongpoll: [Function],
  filesListRevisions: [Function],
  filesMoveV2: [Function],
  filesMove: [Function],
  filesMoveBatchV2: [Function],
  filesMoveBatch: [Function],
  filesMoveBatchCheckV2: [Function],
  filesMoveBatchCheck: [Function],
  filesPermanentlyDelete: [Function],
  filesPropertiesAdd: [Function],
  filesPropertiesOverwrite: [Function],
  filesPropertiesRemove: [Function],
  filesPropertiesTemplateGet: [Function],
  filesPropertiesTemplateList: [Function],
  filesPropertiesUpdate: [Function],
  filesRestore: [Function],
  filesSaveUrl: [Function],
  filesSaveUrlCheckJobStatus: [Function],
  filesSearch: [Function],
  filesUpload: [Function],
  filesUploadSessionAppendV2: [Function],
  filesUploadSessionAppend: [Function],
  filesUploadSessionFinish: [Function],
  filesUploadSessionFinishBatch: [Function],
  filesUploadSessionFinishBatchCheck: [Function],
  filesUploadSessionStart: [Function],
  paperDocsArchive: [Function],
  paperDocsCreate: [Function],
  paperDocsDownload: [Function],
  paperDocsFolderUsersList: [Function],
  paperDocsFolderUsersListContinue: [Function],
  paperDocsGetFolderInfo: [Function],
  paperDocsList: [Function],
  paperDocsListContinue: [Function],
  paperDocsPermanentlyDelete: [Function],
  paperDocsSharingPolicyGet: [Function],
  paperDocsSharingPolicySet: [Function],
  paperDocsUpdate: [Function],
  paperDocsUsersAdd: [Function],
  paperDocsUsersList: [Function],
  paperDocsUsersListContinue: [Function],
  paperDocsUsersRemove: [Function],
  sharingAddFileMember: [Function],
  sharingAddFolderMember: [Function],
  sharingChangeFileMemberAccess: [Function],
  sharingCheckJobStatus: [Function],
  sharingCheckRemoveMemberJobStatus: [Function],
  sharingCheckShareJobStatus: [Function],
  sharingCreateSharedLink: [Function],
  sharingCreateSharedLinkWithSettings: [Function],
  sharingGetFileMetadata: [Function],
  sharingGetFileMetadataBatch: [Function],
  sharingGetFolderMetadata: [Function],
  sharingGetSharedLinkFile: [Function],
  sharingGetSharedLinkMetadata: [Function],
  sharingGetSharedLinks: [Function],
  sharingListFileMembers: [Function],
  sharingListFileMembersBatch: [Function],
  sharingListFileMembersContinue: [Function],
  sharingListFolderMembers: [Function],
  sharingListFolderMembersContinue: [Function],
  sharingListFolders: [Function],
  sharingListFoldersContinue: [Function],
  sharingListMountableFolders: [Function],
  sharingListMountableFoldersContinue: [Function],
  sharingListReceivedFiles: [Function],
  sharingListReceivedFilesContinue: [Function],
  sharingListSharedLinks: [Function],
  sharingModifySharedLinkSettings: [Function],
  sharingMountFolder: [Function],
  sharingRelinquishFileMembership: [Function],
  sharingRelinquishFolderMembership: [Function],
  sharingRemoveFileMember: [Function],
  sharingRemoveFileMember2: [Function],
  sharingRemoveFolderMember: [Function],
  sharingRevokeSharedLink: [Function],
  sharingSetAccessInheritance: [Function],
  sharingShareFolder: [Function],
  sharingTransferFolder: [Function],
  sharingUnmountFolder: [Function],
  sharingUnshareFile: [Function],
  sharingUnshareFolder: [Function],
  sharingUpdateFileMember: [Function],
  sharingUpdateFolderMember: [Function],
  sharingUpdateFolderPolicy: [Function],
  teamLogGetEvents: [Function],
  teamLogGetEventsContinue: [Function],
  usersGetAccount: [Function],
  usersGetAccountBatch: [Function],
  usersGetCurrentAccount: [Function],
  usersGetSpaceUsage: [Function]

*/