import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Table, Header } from "semantic-ui-react";

import Image from "../components/image/image";

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

  const imgs = images.map(image => (
    <Image
      key={image._id}
      image={image}
      removeImage={async () => {
        await removeImage(image._id);
        await loadImages();
      }}
    />
  ));

  const totals = (
    <Table celled>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            <strong>Активных: {totalActive}</strong>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <strong>Всего: {total}</strong>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );

  const header = <Header as="h1">Изображения</Header>;

  return (
    <>
      {header}
      {totals}
      <Card.Group centered>{imgs}</Card.Group>
    </>
  );
};

Images.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
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
