import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Image as ImageComponent,
  List,
  Label,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Image = ({ _id, image, title, incorrectTitles, active, removeImage }) => (
  <Card key={_id}>
    <ImageComponent src={image} wrapped ui={false} />
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
);

Image.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  incorrectTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.bool.isRequired,
  removeImage: PropTypes.func.isRequired
};

export default Image;
