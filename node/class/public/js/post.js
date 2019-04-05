/* global $ */
$('[type="submit"]').on('click', (e) => {
  e.preventDefault();

  $.post(
    '/post',
    {
      name: $('[name="name"]')
        .val()
        .trim(),
      age: $('[name="age"]')
        .val()
        .trim(),
    },
    (res) => {
      console.log(res);
    },
  );
});
