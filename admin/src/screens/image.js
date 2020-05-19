import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Grid,
  Header
} from "semantic-ui-react";

class ImageScreen extends PureComponent {
  componentDidMount() {
    const {
      getImage,
      clearImageData,
      match: {
        params: { id }
      }
    } = this.props;

    clearImageData();

    if (id) {
      getImage(id);
    }
  }

  onImageLoad = e => {
    const { imagePropertyChange } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      imagePropertyChange("image", reader.result);
      imagePropertyChange(
        "title",
        file.name
          .split(".")
          .slice(0, -1)
          .join(".")
      );
    };

    reader.readAsDataURL(file);
  };

  onIncorrectTitleChange = index => event => {
    const { changeIncorrectAnswer } = this.props;
    changeIncorrectAnswer(index, event.target.value);
  };

  onImagePropertyChange = title => event => {
    const { imagePropertyChange } = this.props;
    imagePropertyChange(title, event.target.value);
  };

  onActiveChange = () => {
    const { imagePropertyChange, active } = this.props;
    imagePropertyChange("active", !active);
  };

  render() {
    const {
      match: {
        params: { id }
      },
      image,
      title,
      incorrectTitles,
      active,
      addIncorrectAnswer,
      removeIncorrectAnswer,
      saveImage,
      removeImage,
    } = this.props;

    const titles = incorrectTitles.map((value, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Form.Field key={index}>
          <Input
            icon="copy"
            iconPosition="left"
            placeholder={`Неправильное название ${index + 1}`}
            value={value}
            onChange={this.onIncorrectTitleChange(index)}
          />
        </Form.Field>
      );
    });

    return (
      <Grid centered columns={1}>
        <Grid.Column width={16}>
          <Header as="h1" content="Новое изображение" />
        </Grid.Column>
        <Grid.Column width={15}>
          <Form>
            <Form.Field>
              {image ? (
                <Image centered rounded size="large" src={image} />
              ) : null}
              <Input
                type="file"
                accept=".png, .jpg, .jpeg"
                placeholder="Файл изображения"
                icon="image"
                iconPosition="left"
                onChange={this.onImageLoad}
              />
            </Form.Field>
            <Form.Field>
              <Input
                icon="check"
                iconPosition="left"
                placeholder="Правильное название"
                value={title}
                onChange={this.onImagePropertyChange("title")}
              />
            </Form.Field>
            {titles}
            <Form.Field>
              <Button.Group>
                <Button
                  icon="plus"
                  color="green"
                  content="1 неправильное название"
                  onClick={addIncorrectAnswer}
                />
                <Button
                  icon="minus"
                  color="red"
                  content="1 неправильное название"
                  onClick={removeIncorrectAnswer}
                />
              </Button.Group>
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Активный"
                checked={active}
                onChange={this.onActiveChange}
              />
            </Form.Field>
            <Button
              type="submit"
              icon="save"
              positive
              content="Сохранить"
              onClick={saveImage}
            />
            {id && (
                <Button
                    type="submit"
                    icon="remove"
                    negative
                    content="Удалить"
                    onClick={removeImage}
                />
            )}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

ImageScreen.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  incorrectTitles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  active: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }).isRequired,
  addIncorrectAnswer: PropTypes.func.isRequired,
  removeIncorrectAnswer: PropTypes.func.isRequired,
  imagePropertyChange: PropTypes.func.isRequired,
  changeIncorrectAnswer: PropTypes.func.isRequired,
  saveImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  getImage: PropTypes.func.isRequired,
  clearImageData: PropTypes.func.isRequired
};

export default ImageScreen;
