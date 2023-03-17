const fs = require('fs')

const changeTypeOfPoerty = json => {
  const { data } = json
  const {  movement } = data
  const newSelf = '/v1/correspondent-bank-data-management/movement/retrieve-movement'
  const newListMovement = movement.map(obj => {
    return ({
      ...obj,
      errorMessage: obj.transactionCode.toLowerCase() === 'rechazado' ? 'EXCEDE EL CUPO PERMITIDO' : ''
    })
  })

  json.data.movement = newListMovement
  json.links.self = newSelf

  return json
}

for (let i = 1; i <= 34; i++) {
  const data = require(`./res/${i}.json`)
  const json = changeTypeOfPoerty(data)

  fs.writeFile(`C:/Users/cmramos/Desktop/fiz-scenarios-balance/src/res/${i}.json`, JSON.stringify(json, false, 2), err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File written successfully')
  });
}
