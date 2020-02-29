import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Player = ({ player: { index, name, score, gameId } }) => {
  return (
    <Card key={index}>
      <Card.Content>
        <Card.Meta>Им]</Card.Meta>
        <Card.Description>{name}</Card.Description>
        <p />
        <Card.Meta>Счёт</Card.Meta>
        <Card.Description>{score}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {gameId && (
          <Button
            color="teal"
            as={Link}
            to={`/game/${gameId}`}
            content="К игре"
            size="small"
          />
        )}
      </Card.Content>
    </Card>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gameId: PropTypes.string
  }).isRequired
};

export default Player;
