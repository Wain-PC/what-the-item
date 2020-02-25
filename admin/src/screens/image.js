import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Form, Image, Input } from "semantic-ui-react";

class ImageScreen extends PureComponent {
  static propTypes = {
    image: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      incorrectTitles: PropTypes.arrayOf(PropTypes.string.isRequired)
        .isRequired,
      active: PropTypes.bool.isRequired
    }).isRequired,
    addIncorrectAnswer: PropTypes.func.isRequired,
    removeIncorrectAnswer: PropTypes.func.isRequired,
    imagePropertyChange: PropTypes.func.isRequired,
    changeIncorrectAnswer: PropTypes.func.isRequired,
    saveImage: PropTypes.func.isRequired
  };

  render() {
    const {
      image: { image, title, incorrectTitles, active },
      addIncorrectAnswer,
      removeIncorrectAnswer,
      saveImage
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
      <Form>
        <Form.Field>
          {image ? <Image src={image} /> : null}
          <Input
            type="file"
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
          <Button
            icon="plus"
            color="green"
            content="Добавить неправильный ответ"
            onClick={addIncorrectAnswer}
          />
          <Button
            icon="minus"
            color="red"
            content="Убрать неправильный ответ"
            onClick={removeIncorrectAnswer}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle
            label="Активный"
            positive
            checked={active}
            onChange={this.onActiveChange}
          />
        </Form.Field>
        <Button
          type="submit"
          icon="submit"
          content="Загрузить"
          onClick={saveImage}
        />
      </Form>
    );
  }

  onImageLoad = e => {
    const {
      imagePropertyChange,
      image: { title }
    } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      imagePropertyChange("image", reader.result);
      if (!title) {
        imagePropertyChange(
          "title",
          file.name
            .split(".")
            .slice(0, -1)
            .join(".")
        );
      }
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
    const {
      imagePropertyChange,
      image: { active }
    } = this.props;
    imagePropertyChange("active", !active);
  };
}

export default ImageScreen;
