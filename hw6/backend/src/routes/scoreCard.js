import ScoreCard from "../models/ScoreCard";

const query = async (req, res) => {
  let filteredCards;
  let messages = [];
  const queryType = req.query.type;
  const queryString = req.query.queryString;

  if (queryType === "name") {
    filteredCards = await ScoreCard.find({ name: queryString }).catch((err) => {
      console.log(err);
    });
  }
  if (queryType === "subject") {
    filteredCards = await ScoreCard.find({ subject: queryString }).catch(
      (err) => {
        console.log(err);
      }
    );
  }
  if (filteredCards.length > 0) {
    filteredCards.forEach((card) =>
      messages.push(
        `Found card with ${queryType}: (${card.name}, ${card.subject}, ${card.score})`
      )
    );
    res.send({ messages: messages, cards: filteredCards });
  } else {
    res.send({ message: `${queryType} (${queryString}) not found!` });
  }
};

const updateCard = async (req, res) => {
  let filteredCards;
  const exist = await ScoreCard.findOne({
    name: req.body.name,
    subject: req.body.subject,
  });

  if (!exist) {
    const newScoreCard = new ScoreCard({
      name: req.body.name,
      subject: req.body.subject,
      score: req.body.score,
    });

    await newScoreCard.save();

    filteredCards = await ScoreCard.find({ name: req.body.name }).catch(
      (err) => {
        console.log(err);
      }
    );

    res.send({
      message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`,
      cards: filteredCards,
    });
  } else {
    exist.score = req.body.score;
    await exist.save();
    filteredCards = await ScoreCard.find({ name: req.body.name }).catch(
      (err) => {
        console.log(err);
      }
    );

    res.send({
      message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`,
      cards: filteredCards,
    });
  }
};

const clearDB = async (req, res) => {
  try {
    await ScoreCard.deleteMany({});
    res.json({ message: "Database cleared" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  query,
  updateCard,
  clearDB,
};
