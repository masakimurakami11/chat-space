$(function() {
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${user.id} data-user-name= ${user.name}>追加</div>
              </div>`

              return html;
            }
  function  appendErrMsgToHtml(msg){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
              </div>`

              return html;
  }

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })

    .done (function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0){
        users.forEach(function(user) {
          var html = appendUser(user)
          $('#user-search-result').append(html)
        });
      }
      else {
        var html = appendErrMsgToHtml("一致するユーザーがいません")
        $('#user-search-result').append(html)
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })
  function buildNAME(user_name, user_id) { 
    var name = `<div class ='chat-group-user clearfix js-chat-member'>
                 <p class='chat-group-user__name'>${user_name}</p>
                 <input class = 'hidden_input' value = ${user_id} name = "group[user_ids][]" type = "hidden" data-id = ${user_id}>
                 <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                 </div>`
    return name;
  }
    

  $(document).on("click",".user-search-add",function(){
    var user_name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    var html = buildNAME(user_name,user_id);
    $(".chat-group-users.js-add-userdesu").append(html);
    $(this).parent().remove();
    })
    $(document).on("click",".user-search-remove",function(){
    $(this).parent().remove();
  })
})