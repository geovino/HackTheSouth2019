var xhttp = new XMLHttpRequest();


$("#create-room").on("click", function(event) {
  $.ajax({
      type: "post",
      contentType: "application/json",
      url: "http://3.8.68.131:8080/rooms/",
      data: { 'number_of_players': 4 },
      dataType: "json",
      xhrFields: {
        withCredentials: true
      }
    })
    .done(function(data) {
      console.log(data);
    });
});
