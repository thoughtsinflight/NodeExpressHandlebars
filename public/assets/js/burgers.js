
$(function () {
  // $(".devourburger").on("click", function(event) {
  //   var id = $(this).data("id");

  //   $.ajax("/api/burgers/" + id, {
  //     type: "DELETE" //Put or Update?
  //   }).then(
  //     function() {
  //       console.log("deleted id ", id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger: $("#quo").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".devourburger").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var id = $(this).data("id");

    var updatedBurger = {
      devoured: 1
    };
    // Send the POST request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: updatedBurger
    }).then(
      function () {
        console.log("updated burger");
        // Reload the page to get the updated list
        location.assign("/");
      }
    );
  });
});
