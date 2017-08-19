import Mention from './Mention';
import Suggestion from './Suggestion';

const getMentionDecorators = config => {
  return [
    new Mention(config.mentionClassName).getMentionDecorator(),
    new Suggestion(config).getSuggestionDecorator(),
  ];
};

export default getMentionDecorators;
