import React, { PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';

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
    const file = props.file;
    props.selectFile(file);
  }

  return (
      <Card className="boldr-filecard">
        <Media>
          <img src={ props.file.url } alt={ props.file.file_name } role="presentation" />
        </Media>
        <CardTitle title={ props.file.file_name || 'foo' }>
          <Button className="md-cell--right" icon>star_outline</Button>
        </CardTitle>
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
