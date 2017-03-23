import uuid from 'uuid/v4';
import * as objection from 'objection';
import { responseHandler, Conflict, BadRequest } from '../../core/index';
import slugIt from '../../utils/slugIt';

// Models
import { Post, Comment, PostComment } from '../../models';

const debug = require('debug')('boldr:comment-ctrl');

export async function editComment(req, res, next) {
  try {
    const comment = await Comment.query().findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: `Unable to find a comment with the ID: ${req.params.id}.` });
    }
    if (req.user.id !== comment.comment_author_id || req.user.role !== 'Admin') {
      return res.status(401).json('You dont have permission to edit this comment.');
    }
    const editedComment = await Comment.query()
      .update({
        content: req.body.content,
        raw_content: req.body.raw_content,
      })
      .where({ id: req.params.id });

    return responseHandler(res, 202, 'Saved');
  } catch (error) {
    return next(error);
  }
}

export async function deleteComment(req, res, next) {
  try {
    const comment = await Comment.query().findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: `Unable to find a comment with the ID: ${req.params.id}.` });
    }
    await comment.$relatedQuery('replies').unrelate().where({ comment_parent_id: req.params.id });
    await Comment.query().delete().where('id', req.params.id).first();

    return res.status(204).send({});
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

export async function addCommentReply(req, res, next) {
  try {
    const comment = await Comment.query().findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: `Unable to find a comment with the ID: ${req.params.id}.` });
    }
    const newReply = await comment.$relatedQuery('replies').insert({
      content: req.body.content,
      raw_content: req.body.raw_content,
      comment_author_id: req.user.id,
      comment_author_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });
    await newReply.$relatedQuery('commenter').relate({ id: req.user.id });
    await newReply.$relatedQuery('parent').relate({
      id: newReply.id,
      comment_parent_id: req.params.id,
    });
    return responseHandler(res, 201, newReply);
  } catch (error) {
    return next(error);
  }
}
