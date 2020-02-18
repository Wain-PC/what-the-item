import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";
import { MENU_ITEMS } from "../../constants/system";

const AdminMenu = ({ screenId, actions }) => {
  const menuItems = MENU_ITEMS.map(({ id, icon, method }) => {
    const { [method]: methodFn = () => {} } = actions;
    return (
      <Menu.Item
        as="a"
        key={id}
        active={id === screenId}
        onClick={() => methodFn()}
      >
        <Icon name={icon} />
        {id}
      </Menu.Item>
    );
  });

  return (
    <Menu vertical fluid inverted>
      {menuItems}
    </Menu>
  );
};

AdminMenu.propTypes = {
  screenId: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default AdminMenu;
