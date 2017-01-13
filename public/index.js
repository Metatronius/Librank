let songObjs = [];
$(() =>
{
  $.get('song/rankings', (data) =>
  {
    data = data.sort((a, b) =>
    {
      return b.rating - a.rating;
    });
    for (let i = 0; i < data.length; i++)
    {
      $('#ratings').append(
        `<li>${data[i].trackName} with a rating of ${data[i].rating}</li>`
      );
    }
  })
  $.get('/song/pair', (data) =>
  {
    songObjs = data;
    $('#left').append(
      `<input type="image" src="${data[0].albumArt}"/><p>${data[0].trackName}</p>`
    );
    $('#right').append(
      `<input type="image" src="${data[1].albumArt}"/><p>${data[1].trackName}</p>`
    );
  })
})
$('#left').click((e) =>
{
  $.ajax(
  {
    url: '/song',
    type: 'PUT',
    data: `id1=${songObjs[0].id}&id2=${songObjs[1].id}&winner=left`,
    success: function(data)
    {
      console.log(`id1=${songObjs[0].id}&id2=${songObjs[1].id}&winner=right`);
    }
  });
});
$('#right').click((e) =>
{
  $.ajax(
  {
    url: '/song',
    type: 'PUT',
    data: `id1=${songObjs[0].id}&id2=${songObjs[1].id}&winner=right`,
    success: function(data)
    {
      console.log(`id1=${songObjs[0].id}&id2=${songObjs[1].id}&winner=right`);
    }
  });
});
