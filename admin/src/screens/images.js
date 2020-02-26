import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Image, Label, List, Table } from "semantic-ui-react";

const Images = ({ images, total, active: totalActive, loadImages }) => {
  useEffect(() => {
    loadImages();
  }, []);

  const imgs = images.map(
    ({ image, title, incorrectTitles, active }, index) => (
      <Card key={title + index}>
        <Image src={image} wrapped ui={false} />
        <Card.Content>
          <Card.Meta>Правильное название</Card.Meta>
          <Card.Description>{title}</Card.Description>
          <Card.Meta>Неправильные названия</Card.Meta>
          <Card.Description>
            <List items={incorrectTitles} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label
            color={active ? "green" : "red"}
            horizontal
            content={active ? "Активно" : "Неактивно"}
          />
        </Card.Content>
      </Card>
    )
  );

  return (
    <div>
      <Card.Group>{imgs}</Card.Group>
      <Table celled>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="2">
              <strong>Active: {totalActive}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>Total: {total}</strong>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

Images.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string,
      incorrectTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
      active: PropTypes.bool.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  loadImages: PropTypes.func.isRequired
};

export default Images;
