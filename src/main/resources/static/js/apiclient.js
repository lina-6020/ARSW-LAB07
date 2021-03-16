var url = "http://localhost:8080/blueprints/";

var apiclient = (function () {
  var getBlueprintsByAuthor = function (author, callback) {
    var urlSend = url + author;
    $.get(urlSend, function (data, state) {
      if (state == "success") {
        callback(data);
      } else {
        alert("Error");
      }
    });
  };

  var getBlueprintsByNameAndAuthor = function (
    author,
    nameBlueprint,
    callback
  ) {
    var urlSend = url + author + "/" + nameBlueprint;
    $.get(urlSend, function (data, state) {
      if (state == "success") {
        callback(data);
      } else {
        alert("Error");
      }
    });
  };

  var saveBlueprint = function (blueprint) {
    var author = blueprint.author;
    var name = blueprint.name;
    var urlSend = url + author + "/" + name;
    return $.ajax({
      url: urlSend,
      type: "PUT",
      data: JSON.stringify(blueprint),
      contentType: "application/json",
    }).then(function () {
      handlerBlueprints.updateBlueprints(author);
    });
  };

  var newBlueprint = function (author, newName, callBack) {
    return $.ajax({
      url: url,
      type: "POST",
      data: `{"author":"${author}","name":"${newName}","points":[] }`,
      contentType: "application/json",
    })
      .then(function () {
        handlerBlueprints.updateBlueprints(author);
      })
      .then(function () {
        callBack([]);
      });
  };

  var deleteBlueprint = function () {
    return $.ajax({
      url: url,
      type: "DELETE",
      data: ``,
      contentType: "application/json",
    });
  };

  return {
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    saveBlueprint: saveBlueprint,
    newBlueprint: newBlueprint,
    deleteBlueprint: deleteBlueprint,
  };
})();
