import React from 'react';
import {
  Avatar,
  CardTitle,
  Card,
  FontIcon,
  CardActions,
  CardText,
  Button,
  Media,
  MediaOverlay,
  Heading,
} from 'boldr-ui';

import Link from 'react-router-dom/Link';
import config from '../../../../../../../config';

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
    const {file} = props;
    props.selectFile(file);
  }

  return (
    <Card className="boldr-filecard">
      <Media>
        <img
          src={`${config('apiUrl')}${props.file.url}`}
          alt={props.file.fileName}
          role="presentation"
        />
        <MediaOverlay>
          <CardTitle title={props.file.fileName || 'foo'} />
        </MediaOverlay>
      </Media>
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
