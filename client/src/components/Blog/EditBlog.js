import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoSend } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBlog, updateBlog } from '../../action/blogAction';
import { toast } from 'react-toastify'
import { clearBlogUpdate } from '../../slices/blogSlice';
import { useParams } from 'react-router-dom';

const categories = [
  "Travel", "Food", "Lifestyle", "Fashion", "Beauty", "Health", "Fitness", "Parenting",
  "Finance", "Technology", "DIY & Crafts", "Home Decor", "Gardening", "Education",
  "Photography", "Pets", "Sports", "Entertainment", "Politics & Current Events", "Art & Design"
];

const EditBlog = () => {
  const dispatch = useDispatch()
  const { id: blogId } = useParams()

  const { isBlogUpdated, blog = {} } = useSelector((state) => state.blogState)

  const [editorHtml, setEditorHtml] = useState('');
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [thumbnailPreview, setThumbnailPreview] = useState('/images/thumbnail.png')
  const [thumbnail, setThumbnail] = useState('')

  const onInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setThumbnailPreview(reader.result);
            setThumbnail(file);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('category', category)
    formData.append('title', title)
    formData.append('description', editorHtml)
    formData.append('thumbnail', thumbnail)
    dispatch(updateBlog(blogId, formData))
  }

  useEffect(() => {
    if (blogId && blog._id === blogId) {
      setTitle(blog.title);
      setCategory(blog.category);
      setThumbnail(blog.thumbnail);
      setThumbnailPreview(blog.thumbnail); 
      setEditorHtml(blog.description);
    } else {
      dispatch(getSingleBlog(blogId));
    }
  }, [dispatch, blogId, blog]);

  useEffect(() => {
    if (isBlogUpdated) {
      toast('Blog Updated Successfully', {
        position: 'bottom-center',
        type: 'success',
        onOpen: () => dispatch(clearBlogUpdate())
      })
    }
  }, [isBlogUpdated, dispatch])

  return (
    <div className='createBlogs'>
      <br /><br />
      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div>
          <div className='blogcategory'>
            <select id="categorySelect" name='category' required value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="blogimage">
            <img src={thumbnailPreview} alt="Thumbnail Preview" />
            <div className="file-input-container">
              <input type="file" name='thumbnail' id="thumbnail-input" className="file-input" onChange={onInputChange} />
              <label htmlFor="thumbnail-input" className="file-input-label">Choose Thumbnail</label>
            </div>
          </div>
        </div>
        <div className='blog-input'>
          <div className='blogpublish'>
            <input
              type="text"
              maxLength={80}
              minLength={60}
              name='title'
              value={title}
              required
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)} />
            <button><IoSend /></button>
            <div className='hoverpublish'>
              <span>Publish</span>
            </div>
          </div>
          <ReactQuill
            theme="snow"
            className='textcreate'
            style={{
              backgroundColor: "white",
              height: "60vh",
              width: '100%',
              border: 'none',
              outline: 'none',
              overflowY: 'scroll'
            }}
            value={editorHtml}
            name='description'
            onChange={setEditorHtml}
            modules={modules}
            formats={formats}
          />
        </div>
      </form>
      <br /><br /><br />
    </div>
  );
}

export default EditBlog;
