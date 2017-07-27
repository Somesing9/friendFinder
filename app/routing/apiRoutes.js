var friendData = require("../data/friends.js");

module.exports = function(app) {
  // GET /api/friends route, display a JSON of all possible friends
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // POST /api/friends, handle incoming surveys, also handle compatibility logic
  app.post("/api/friends", function(req, res) {
    console.log("API POST");
    // If less than 2 people in database, return false
    if (friendData.length < 1) {
      console.log(req.body);
      friendData.push(req.body);
      // console.log(friendData);
      res.json(false);
    } else {
      var newFriend = req.body;
      var bestMatchScore = 0;
      var bestMatchIndex = 0;
      var currentScore = 0;
      var nfScores = newFriend.scores;
      var cfScores = [];

      for (var i = 0; i < friendData.length; i++) {
        cfScores = friendData[i].scores;
        currentScore = 0;
        for (var j = 0; j < newFriend.scores.length; j++) {
          var cfScores = friendData[i].scores;
          if (parseInt(nfScores[j]) != parseInt(cfScores[j])) {
            var difference = parseInt(nfScores[j]) - parseInt(cfScores[j]);
            console.log(difference);
            if (difference < 0) {
              difference = difference * -1;
            }
            currentScore += difference;
          }
        }

        if (i === 0) {
          bestMatchScore = currentScore;
        }

        if (currentScore < bestMatchScore) {
          console.log("Best" + bestMatchScore + " currentScore " + currentScore);
          bestMatchScore = currentScore;
          bestMatchIndex = i;
        }
        console.log("bestMatchIndex" + bestMatchIndex);
        console.log(friendData[i].name + " difference is: " + currentScore);
      }
      console.log("Best Match = " + JSON.stringify(friendData[bestMatchIndex], null, 2) + " Score: " + bestMatchScore);
      friendData.push(req.body);
      res.json(friendData[bestMatchIndex]);
    }
  });
}