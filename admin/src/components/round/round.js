import React from "react";
import PropTypes from "prop-types";
import { Header, Label, Table } from "semantic-ui-react";
import Image from "../image/image";
import styles from "./round.module.css";

const Round = ({
  round: {
    index,
    started,
    finished,
    answered,
    selection,
    image,
    answerIndex,
    userAnswered,
    pointsReceived,
    startedOn,
    finishedOn
  }
}) => {
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

  const answeredLabel = finished ? (
    <Label
      color={answered ? "green" : "red"}
      content={answered ? "Угадан" : "Не угадан"}
    />
  ) : null;

  const dateDiff = (new Date(finishedOn) - new Date(startedOn)) / 1000;

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <Header as="h2">Раунд {index + 1}</Header>
      </div>
      <div className={styles.row}>
        {startedLabel}
        {finishedLabel}
        {answeredLabel}
      </div>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <Image image={image} />
        </div>
        <div className={styles.tableContainer}>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Опция</Table.HeaderCell>
                <Table.HeaderCell>Ответ</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Ответ игрока</Table.Cell>
                <Table.Cell>
                  {selection[userAnswered] && selection[userAnswered].title}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Правильный ответ</Table.Cell>
                <Table.Cell>
                  {selection[answerIndex] && selection[answerIndex].title}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Очков</Table.Cell>
                <Table.Cell>{pointsReceived}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Время ответа</Table.Cell>
                <Table.Cell>{dateDiff} c</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

Round.propTypes = {
  round: PropTypes.shape({
    index: PropTypes.number.isRequired,
    started: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    answered: PropTypes.bool.isRequired,
    image: PropTypes.shape({}).isRequired,
    answerIndex: PropTypes.number.isRequired,
    userAnswered: PropTypes.bool.isRequired,
    pointsReceived: PropTypes.number.isRequired,
    startedOn: PropTypes.string.isRequired,
    finishedOn: PropTypes.string.isRequired,
    selection: PropTypes.array.isRequired
  }).isRequired
};

export default Round;
