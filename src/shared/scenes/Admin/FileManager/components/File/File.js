import React from 'react';
import { FontIcon, Button } from 'boldr-ui';
import {
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import Link from 'react-router-dom/Link';
// import config from '../../../../../../../config';

type Props = {
  removeMedia?: Function,
  selectFile: Function,
  file?: {
    id?: string,
    fileName?: string,
    url?: string,
  },
};

const File = (props: Props) => {
  function handleclick() {
    const mediaId = props.file.id;
    props.removeMedia(mediaId);
  }

  function handleSelect() {
    const { file } = props;
    props.selectFile(file);
  }

  return (
    <Card className="boldr-filecard">
      <CardMedia overlay={<CardTitle title={props.file.fileName} />}>
        <img
          src={`http://localhost:2121${props.file.url}`}
          alt={props.file.fileName}
          role="presentation"
        />
      </CardMedia>
      <CardActions>
        <Link to={`/admin/file-editor/${props.file.id}`}>
          <Button icon onClick={handleSelect}>
            <FontIcon>mode_edit</FontIcon>
          </Button>
        </Link>
        <Button icon onClick={handleclick}>
          <FontIcon>delete_forever</FontIcon>
        </Button>
      </CardActions>
    </Card>
  );
};

export default File;
