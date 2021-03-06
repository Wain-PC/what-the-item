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
  image: { _id, url = "", title = "", incorrectTitles = [], active },
  removeImage
}) => (
  <Card>
    <ImageComponent src={url} wrapped ui={false} />
    {active !== undefined && (
      <Label
        color={active ? "green" : "red"}
        content={active ? "Активно" : "Неактивно"}
      />
    )}
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
        {_id && (
          <Button
            negative
            content="Удалить"
            size="small"
            onClick={() => {
              removeImage(_id);
            }}
          />
        )}
      </Card.Content>
    )}
  </Card>
);

Image.propTypes = {
  image: PropTypes.shape({
    _id: PropTypes.string,
    url: PropTypes.string.isRequired,
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
