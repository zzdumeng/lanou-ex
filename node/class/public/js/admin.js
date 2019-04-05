/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
$(() => {
  const container = $('#news')
  const users = []
  function h(tag, attrs, children) {
    const el = document.createElement(tag)
    Object.keys(attrs).forEach((key) => {
      el.setAttribute(key, attrs[key])
    })
    if (children === undefined || children === null) {
      return el
    }

    if (typeof children === 'string') {
      el.innerText = children
      return el
    }
    if (!(children instanceof Array)) {
      // eslint-disable-next-line no-param-reassign
      children = [children]
    }
    children.forEach((child) => {
      el.appendChild(child)
    })
    return el
  }
  function onAddNews() {
    // show the modal
    $('#modal').modal('show')
  }
  function onCommitNews() {
    $.post(
      '/news/new',
      {
        title: $('#new-title').val(),
        content: $('#new-content').val(),
        author: $('#users').val(),
      },
      (json) => {
        if (!json.error) {
          container.append(createNews(json))
        } else {
          console.log(json.message)
        }
      },
      'json',
    )
  }
  function createNews({
    _id, title, content, author, publish_date, update_date,
  }) {
    const addButton = h('button', [], '添加')
    const deleteButton = h('button', [], '删除')
    const editButton = h('button', [], '修改')
    $(addButton).on('click', onAddNews)
    const news = h('div', { class: 'row' }, [
      h('div', { class: 'col-2' }, title),
      h('div', { class: 'col-3' }, content),
      h('div', { class: 'col-2' }, author.name),
      h('div', { class: 'col-2' }, publish_date),
      h('div', { class: 'col-3' }, [editButton, deleteButton, addButton]),
    ])

    $(editButton).on('click', () => {
      $('#edit-title').val(title)
      $('#edit-content').val(content)
      $('#edit-users').val(author._id)
      $('#edit-modal').modal('show')
      $('#edit-commit').on('click', () => {
        $.post(
          `/news/update/${_id}`,
          {
            title: $('#edit-title').val(),
            content: $('#edit-content').val(),
            author: $('#edit-users').val(),
          },
          (json) => {
            if (json.error) {
              console.log(json.message)
              return
            }
            // update at local
            $(news)
              .children().eq(0)
              .text(json.title)
              .end()
              .eq(1)
              .text(json.content)
              .end()
              .eq(2)
              .text(json.author.name)
          },
        )
      })
    })
    $(deleteButton).on('click', () => {
      $.post(`/news/delete/${_id}`, (json) => {
        if (json.error) console.error(json.message)
        else {
          // container.remove(news)
          container[0].removeChild(news)
        }
      })
    })
    return news
  }
  function getAll() {
    $.getJSON('/user', (data) => {
      if (!data.error) {
        Array.prototype.push.apply(users, data)
        // and add options to select
        const frag = document.createDocumentFragment()
        data.forEach((user) => {
          frag.appendChild(h('option', { value: user._id }, user.name))
        })
        const afrag = frag.cloneNode(true)
        $('#users').append(frag)
        $('#edit-users').append(afrag)
      }
    })
    $.getJSON('/news', (data) => {
      if (!data.error) {
        const frag = document.createDocumentFragment()
        data.forEach((news) => {
          frag.appendChild(createNews(news))
        })
        container.get(0).appendChild(frag)
      } else {
        console.error(data.message)
      }
    })
  }
  // $('#modal-button').on('click' , () => {
  //   $('#modal').modal('show')

  // })
  $('#commit').on('click', onCommitNews)
  getAll()
})
