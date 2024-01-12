import Link from "next/link"

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <section className="formContainer">
     <h2>{type} Post</h2>

     <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='content'>
        Share a fun fact
      </label>
      <textarea
      value={post.content}
      onChange={(e) => {
      setPost({...post, content:e.target.value})}}
      placeholder="Write a fun fact here..."
      required
      id="content"
      className="formTextArea"
      >
      </textarea>
     <label htmlFor='tag'><h4>Tag</h4> #entertainment, #politics, #geography</label>
      <input
      value={post.tag}
      onChange={(e) => {
      setPost({...post, tag:e.target.value})}}
      placeholder="#tag"
      required
      id="tag"
      className="formInput"
      />
      <div className="postBtns">
        <Link href={'/'} className="cancel">
          Cancel
        </Link>
        <button
        type="submit"
        disabled={submitting}
        className={`${type === 'Edit' && 'edit'}`}
        >
          {submitting ? `${type}...` : type}
        </button>
      </div>
     </form>
    </section>
    
  )
}

export default Form