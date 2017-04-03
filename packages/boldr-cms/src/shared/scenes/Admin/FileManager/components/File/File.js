import React, { PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';

import config from '../../../../../../../config';

type Props = {
  removeMedia?: Function,
  selectFile: Function,
  file?: {
    id?: string,
    file_name?: string,
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
      <Media>
        <img
          src={ `${config('apiUrl')}${props.file.url}` }
          alt={ props.file.file_name }
          role="presentation"
        />
        <MediaOverlay>
          <CardTitle title={ props.file.file_name || 'foo' } />
        </MediaOverlay>
      </Media>
      <CardActions>
        <Button icon onClick={ handleSelect }>
          <FontIcon>mode_edit</FontIcon>
        </Button>
        <Button icon onClick={ handleclick }>
          <FontIcon>delete_forever</FontIcon>
        </Button>
      </CardActions>
    </Card>
  );
};

export default File;
