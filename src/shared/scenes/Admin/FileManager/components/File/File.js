import React, { PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
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
    const { file } = props;
    props.selectFile(file);
  }

  return (
    <Card className="boldr-filecard">
      <Media>
        <img src={ `${config('apiUrl')}${props.file.url}` } alt={ props.file.fileName } role="presentation" />
        <MediaOverlay>
          <CardTitle title={ props.file.fileName || 'foo' } />
        </MediaOverlay>
      </Media>
      <CardActions>
        <Link to={ `/admin/file-editor/${props.file.id}` }>
          <Button icon onClick={ handleSelect }>
            <FontIcon>mode_edit</FontIcon>
          </Button>
        </Link>
        <Button icon onClick={ handleclick }>
          <FontIcon>delete_forever</FontIcon>
        </Button>
      </CardActions>
    </Card>
  );
};

export default File;
