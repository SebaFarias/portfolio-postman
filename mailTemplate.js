const mailTemplate = data => {
  return `
    <p>${data.name} ( ${data.email} )<p>
    <p>dice:<p>
    <p>${data.message}<p>
    `
}

module.exports = mailTemplate