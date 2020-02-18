import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "semantic-ui-react";

const Paginator = ({ current, total, onChange }) => (
  <Pagination
    boundaryRange={0}
    activePage={current}
    totalPages={total}
    siblingRange={1}
    onPageChange={(e, { activePage }) => onChange(activePage)}
  />
);

Paginator.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Paginator;
