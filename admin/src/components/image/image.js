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

const Image = ({
  image: { _id, image = "", title = "", incorrectTitles = [], active },
  removeImage
}) => (
  <Card>
    <ImageComponent src={image} wrapped ui={false} />
    {title || incorrectTitles.length ? (
      <Card.Content>
        {title && (
          <>
            <Card.Meta>Правильное название</Card.Meta>
            <Card.Description>{title}</Card.Description>
          </>
        )}
        {incorrectTitles.length ? (
          <>
            <p />
            <Card.Meta>Неправильные названия</Card.Meta>
            <Card.Description>
              <List items={incorrectTitles} />
              {active !== undefined && (
                <Label
                  color={active ? "green" : "red"}
                  content={active ? "Активно" : "Неактивно"}
                />
              )}
            </Card.Description>
          </>
        ) : null}
      </Card.Content>
    ) : null}
    {_id && (
      <Card.Content extra>
        <Button
          as={Link}
          to={`/image/${_id}`}
          content="Редактировать"
          size="small"
        />
        {removeImage && (
          <Button
            negative
            content="Удалить"
            size="small"
            onClick={() => removeImage(_id)}
          />
        )}
      </Card.Content>
    )}
  </Card>
);

Image.propTypes = {
  image: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    incorrectTitles: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.bool
  }).isRequired,
  removeImage: PropTypes.func
};

Image.defaultProps = {
  removeImage: undefined
};

export default Image;
