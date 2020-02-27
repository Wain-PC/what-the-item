import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { MENU_ITEMS } from "../../constants/system";

const AdminMenu = () => {
  const menuItems = MENU_ITEMS.map(({ id, icon }) => {
    return (
      <Menu.Item as={NavLink} key={id} to={`/${id}`} activeClassName="active">
        <Icon name={icon} />
        {id}
      </Menu.Item>
    );
  });

  return (
    <Menu fluid inverted>
      {menuItems}
    </Menu>
  );
};

export default AdminMenu;
