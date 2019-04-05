/* global Flash */

(function c() {
  const $ = document.querySelector.bind(document)
  EventTarget.prototype.on = EventTarget.prototype.addEventListener

  const agent = {}
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
  function updateUrl(url, title) {
    // if (!url.startsWith('/')) {
    //   url = `/${url}`
    // }
    window.history.replaceState(null, title, url)
  }
  const loginTab = $('#login-tab')
  const registerTab = $('#register-tab')
  loginTab.on('click', () => {
    updateUrl('/login', '登录')
  })
  registerTab.on('click', () => {
    updateUrl('/register', '注册')
  })
  const login = $('#login')
  const register = $('#register')
  const usernameRe = /\w{6,16}/
  const pwRe = /\w{6,16}/
  login.on('click', (e) => {
    const username = $('#login-panel [name="username"]').value.trim()
    const password = $('#login-panel [name="password"]').value.trim()
    // do NOT format check when login
    agent.post('/login', { username, password }, (txt) => {
      const json = JSON.parse(txt)
      if (json.error) {
        const flash = new Flash(json.message)
        flash.present()
      } else {
        // login success!
        window.location.href = '/home'
      }
    })
  })

  register.on('click', () => {
    const username = $('#register-panel [name="username"]').value.trim()
    const password = $('#register-panel [name="password"]').value.trim()
    const passwordAgain = $('#register-panel [name="passwordAgain"]').value.trim()
    if (password !== passwordAgain) {
      const flash = new Flash('password not match')
      flash.present()
      return
    }
    if (usernameRe.test(username) && pwRe.test(password)) {
      agent.post('/register', { username, password, passwordAgain }, (txt) => {
        const json = JSON.parse(txt)
        if (json.error) {
          const flash = new Flash(json.message)
          flash.present()
        } else {
          // register success, goto login page
          const flash = new Flash(json.message)
          flash.present()
          setTimeout(() => {
            window.location.href = '/login'
          }, 1000)
        }
      })
    }
  })
}())
