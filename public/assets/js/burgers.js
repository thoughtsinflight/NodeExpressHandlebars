// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delburger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger: $("#quo").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/quotes", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".update-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var updatedBurger = {
      burger: $("#quo").val().trim()
    };

    var id = $(this).data("id");

    // Send the POST request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: updatedBurger
    }).then(
      function() {
        console.log("updated burger");
        // Reload the page to get the updated list
        location.assign("/");
      }
    );
  });
});
