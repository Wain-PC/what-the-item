import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Label, List } from "semantic-ui-react";
import Image from "../image/image";

const Config = (
  {
    round: {
      index,
      started,
      finished,
      answered,
      answeredBy,
      selection,
      image: { _id, title, incorrectTitles, image }
    }
  },
  players
) => {
  const startedLabel = finished ? null : (
    <Label
      color={started ? "green" : "red"}
      content={started ? "Начат" : "Не начат"}
    />
  );

  const finishedLabel = started ? (
    <Label
      color={finished ? "green" : "red"}
      content={finished ? "Завершен" : "Не завершен"}
    />
  ) : null;

  const lines = selection.map(({ title, selected, selectedBy }) => {
    return <List.Item key={title}>{title}</List.Item>;
  });

  const list = <List>{lines}</List>;

  return (
    <Segment>
      <Header as="h2">Раунд {index + 1}</Header>
      {startedLabel}
      {finishedLabel}
      <Image image={{ image }} />
      {list}
    </Segment>
  );
};

Config.propTypes = {
  round: PropTypes.shape({
    selection: PropTypes.array.isRequired
  }).isRequired,
  players: PropTypes.array.isRequired
};

export default Config;
