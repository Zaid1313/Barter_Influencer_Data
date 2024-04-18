const { auth, drive_v3 } = require('@googleapis/drive')
const { sheets } = require('@googleapis/sheets')
const XLSX = require('xlsx')


const authObj = new auth.GoogleAuth({
    keyFile: 'bartergram_service.json',
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.metadata',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/drive.photos.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })

const getSheetData = async (sheetId) => {
    try {
        const authClient = await authObj.getClient()
        const drive = new drive_v3.Drive({ auth: authClient })
        await drive.files.get({ fileId: sheetId })
        const { data } = await drive.files.export(
          { fileId: sheetId, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', alt: 'media' },
          { responseType: 'arraybuffer' },
        )
        if (!data) {
          throw new Error('Failed to read data from google sheet')
        }
        console.log('Got Drive')
        const workBook = XLSX.read(data)
        return workBook
      } catch (error) {
        console.log(`${error.message} error while reading google sheet`, 'analytics-report')
        
      }
    }


module.exports = {
    getSheetData
}