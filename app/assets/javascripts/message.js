$(function(){
  function new_message(message){
    var image = (message.image.url)?`<img src=${message.image.url} class="lower-message__image">`:"";
    var new_message = '<div class = "main__message">' +
                        '<div class = "main__message-name">' + message.name + '</div>' +
                        '<div class = "main__message-date">' + message.date + '</div>' +
                        '<div class = "main__message-message">' +
                        '<p class = "lower-message_content">' + message.content + '</p>' +
                        '<p class = "lower-message_image">' + image + '</p>' +
                        '</div>' + 
                      '</div>'
        return new_message;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      type: 'POST',
      url: href,
      data: formData,
      dataType: 'json',
      contentType: false,
      processData: false,
    })
    .done(function(data){
      var html = new_message(data);
      $('.main__message__box').append(html)
      $('.form__message').val('')
      $('.hidden').val('')
      $('.main__message__box').animate({scrollTop: $('.main__message__box')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    $( "input" ).prop( "disabled", false );
    })
  })
});

