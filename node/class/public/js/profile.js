/* global Flash */
const $ = document.querySelector.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

const submit = $('#submit')
const agent = {}
const avatarEl = $('#profile-avatar')
agent.post = function post(url, data, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.onreadystatechange = function change() {
    if (xhr.readyState === 4) {
      cb(xhr.responseText)
    }
  }
  xhr.send(data)
}

submit.on('click', (e) => {
  e.preventDefault()
  const img = $('#avatar').files[0]
  if (img) {
    // TODO: with token
    const form = new FormData()
    form.append('avatar', img)
    agent.post('http://localhost:8080/profile', form, (res) => {
      const json = JSON.parse(res)
      if (json.error) {
        const flash = new Flash(json.message)
        flash.present()
      } else {
        const flash = new Flash(json.message)
        flash.present()
        // TODO: do NOT refresh page,
        // only update the avatar img src;
        // window.location.reload()
        console.log(json)

        avatarEl.src = `/${json.avatar}`
      }
    })
  }
})
