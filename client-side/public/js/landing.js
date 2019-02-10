var xhttp = new XMLHttpRequest();


$("#create-room").on("click", function(event) {
  $.ajax({
      type: "post",
      contentType: "application/json",
      url: "http://3.8.68.131:8080/rooms/",
      data: JSON.stringify({ 'number_of_players': 5 }),
      dataType: "json",
      crossDomain: true,
      success: function(data) {
        $("#link-present").removeClass("hidden");
        $("#create-room").addClass("hidden");
        $("#link-display").text("localhost:3000/" + data["identifier"] + "/enter_name");
      }
    })
});
