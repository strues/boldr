import React from 'react'

const Section3 = (props) => {
  const {
    arrIndex, data, edit, onChange,
    onClickSave, onClickDelete,
  } = props

  if (!edit) {
    return (
      <div>
        <h1>{data.createdAt}</h1>
        <img role="presentation" src={data.linkImage1} />
        <img role="presentation" src={data.linkImage2} />
        <img role="presentation" src={data.linkImage3} />
        <div className="FormActions">
          <button type="button" onClick={onClickSave.bind(null, arrIndex)}>Edit</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <label htmlFor="f1" className="FormGroup">
        <span>Created At</span>
        <input
          className="FormControl"
          name="createdAt"
          type="text"
          value={data.createdAt}
          onChange={onChange.bind(null, arrIndex)}
        />
      </label>
      <label htmlFor="f2" className="FormGroup">
        <span>Link Image 1</span>
        <input
          className="FormControl"
          name="linkImage1"
          type="text"
          value={data.linkImage1}
          onChange={onChange.bind(null, arrIndex)}
        />
      </label>
      <label htmlFor="f3" className="FormGroup">
        <span>Link Image 2</span>
        <input
          className="FormControl"
          name="linkImage2"
          type="text"
          value={data.linkImage2}
          onChange={onChange.bind(null, arrIndex)}
        />
      </label>
      <label htmlFor="f4" className="FormGroup">
        <span>Link Image 3</span>
        <input
          className="FormControl"
          name="linkImage3"
          type="text"
          value={data.linkImage3}
          onChange={onChange.bind(null, arrIndex)}
        />
      </label>
      <div className="FormActions">
        <button type="button" onClick={onClickSave.bind(null, arrIndex)}>Save</button>
        <button type="button" onClick={onClickDelete.bind(null, arrIndex)}>Delete</button>
      </div>
    </div>
  )
}

Section3.propTypes = {
  arrIndex: React.PropTypes.number,
  data: React.PropTypes.object,
  edit: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onClickSave: React.PropTypes.func,
  onClickDelete: React.PropTypes.func,
}

export default Section3
