// Express
const express = require('express')
const app = express()
const port = 3000

// Dropbox
require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;

// Other
require('dotenv').config();


app.get('/', (req, res) => {
  var DROPBOX_ACCOUNT_ACCESS_TOKEN = process.env.DROPBOX_ACCOUNT_ACCESS_TOKEN;
  var DROPBOX_ACCOUNT_CLIENT_ID = process.env.DROPBOX_ACCOUNT_CLIENT_ID;

  // http://dropbox.github.io/dropbox-sdk-js/tutorial-Authentication.html
  // https://github.com/dropbox/dropbox-sdk-js/blob/master/examples/javascript/auth/index.html

  var dbx = new Dropbox({ accessToken: DROPBOX_ACCOUNT_ACCESS_TOKEN, fetch: fetch });

  dbx.setClientId(DROPBOX_ACCOUNT_CLIENT_ID)
  var authUrl = dbx.getAuthenticationUrl('http://localhost:8080/auth')
  console.log(dbx)

  res.send(JSON.stringify(dbx))
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