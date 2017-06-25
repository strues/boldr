// @flow
import React from 'react';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Link from 'react-router-dom/Link';
import FontIcon from '../../../../../components/FontIcon';

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
          <IconButton onTouchTap={handleSelect}>
            <FontIcon>mode_edit</FontIcon>
          </IconButton>
        </Link>
        <IconButton onTouchTap={handleclick}>
          <FontIcon>delete_forever</FontIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default File;
