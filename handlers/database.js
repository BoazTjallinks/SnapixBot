import { reactionSomething } from '../var/config.json'
import { readFileSync, writeFile } from 'fs'
import path from 'path'

export async function fetchCollection(tableName) {
  // Creates promise for Fetching data
  return new Promise(function (resolve, reject) {
    // Defines correct file
    let file = path.join(__dirname, `../var/btdb/${tableName}.json`)

    // Reads dir sync so it can get the correct ifle
    const content = readFileSync(file, 'utf8', async function readFileCallback(err, data) {
      // Returns error if that happens
      if (err) return err

      // Returns parsed
      return JSON.parse(data)
    })
    // Resolves content
    resolve(content)
  })
}

export async function setCollection(tableName, newCollection) {
    // Get's file
    let file = path.join(__dirname, `../var/btdb/${tableName}.json`)

    let finalContent = JSON.stringify({
      "collectionName": tableName,
      "collectionContent": newCollection
    })

    // Write new json to file
    let data = await writeFile(file, finalContent, 'utf8', function (err) {
      if (err) return err
      return 'Success!'
    })

    if (data !== 'Success!') {
      throw data
    }

    return data
}

export async function addCollection(tableName, newItem) {
  fetchCollection(tableName).then(async function (cont) {
    let JSONcontent = JSON.parse(cont)
    let content = JSONcontent.collectionContent
    
    content.push(newItem);

    let finalContent = JSON.stringify({
      "collectionName": JSONcontent.collectionName,
      "collectionContent": content
    })
    
    // Get's file
    let file = path.join(__dirname, `../var/btdb/${tableName}.json`)

    // Write new json to file
    let data = await writeFile(file, finalContent, 'utf8', function (err) {
      if (err) return err
      return 'Success!'
    })

    if (data !== 'Success!') {
      throw data
    }

    return data
  })
}
