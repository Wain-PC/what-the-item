import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Image, List, Table, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Images = ({
  images,
  total,
  active: totalActive,
  loadImages,
  removeImage
}) => {
  useEffect(() => {
    loadImages();
  }, []);

  const imgs = images.map(({ _id, image, title, incorrectTitles, active }) => (
    <Card key={_id}>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Meta>Правильное название</Card.Meta>
        <Card.Description>{title}</Card.Description>
        <p />
        <Card.Meta>Неправильные названия</Card.Meta>
        <Card.Description>
          <List items={incorrectTitles} />
          <Label
            color={active ? "green" : "red"}
            content={active ? "Активно" : "Неактивно"}
          />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          as={Link}
          to={`/image/${_id}`}
          content="Редактировать"
          size="small"
        />
        <Button
          negative
          content="Удалить"
          size="small"
          onClick={() => removeImage(_id)}
        />
      </Card.Content>
    </Card>
  ));

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
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string,
      incorrectTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
      active: PropTypes.bool.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  loadImages: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired
};

export default Images;
