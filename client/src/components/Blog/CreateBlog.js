import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoSend } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../action/blogAction';
import { toast } from 'react-toastify'
import { clearBlogCreated } from '../../slices/blogSlice';
import { useNavigate } from 'react-router-dom';

const categories = [
  "Travel", "Food", "Lifestyle", "Fashion", "Beauty", "Health", "Fitness", "Parenting",
  "Finance", "Technology", "DIY & Crafts", "Home Decor", "Gardening", "Education",
  "Photography", "Pets", "Sports", "Entertainment", "Politics & Current Events", "Art & Design"
];

const CreateBlog = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isBlogCreated } = useSelector((state) => state.blogState)

  const [editorHtml, setEditorHtml] = useState('');

  const [blogData, setBlogData] = useState({
    category: '',
    title: '',
  })

  const [thumbnailPreview, setThumnailPreview] = useState('/images/thumbnail.png')
  const [thumbnail, setThumnail] = useState('')

  const { title, category } = blogData

  const onInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = image.width;
              canvas.height = image.height;
              ctx.drawImage(image, 0, 0);
              canvas.toBlob((blob) => {
                setThumnailPreview(window.URL.createObjectURL(blob));
                setThumnail(blob);
              }, file.type, 1);
            };
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setBlogData({ ...blogData, [e.target.name]: e.target.value });
    }
  };



  const handleChange = (event) => {
    setBlogData({ ...blogData, category: event.target.value });
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean'],
      [{ 'align': [] }],
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align',
  ];

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('category', category)
    formData.append('title', title)
    formData.append('description', editorHtml)
    formData.append('thumbnail', thumbnail)
    dispatch(createBlog(formData))
  }

  useEffect(() => {
    if (isBlogCreated) {
      toast('Blog Posted Successfully', {
        position: 'top-center',
        type: 'success',
        onOpen: () => dispatch(clearBlogCreated())
      })
      navigate('/blogs')
      return
    }
  }, [isBlogCreated, dispatch, navigate])

  const [editorLength, setEditorLength] = useState(0);

  const editorRef = React.createRef();

  const handleEditorChange = (content) => {
    const maxLength = 1000;
    const plainText = content.replace(/(<([^>]+)>)/gi, "");
    if (plainText.length > maxLength) {
      const truncatedText = plainText.substring(0, maxLength);
      setEditorLength(maxLength);
      setEditorHtml(truncatedText);
    } else {
      setEditorLength(plainText.length);
      setEditorHtml(content);
    }
  };

  const countCharacters = (text) => {
    const strippedText = text.replace(/(<([^>]+)>)/gi, "");
    return strippedText.length;
  }


  return (
    <div className='createBlogs'>
      <br /><br />
      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div>
          <div className='blogcategory'>
            <select id="categorySelect" name='category' required value={category} onChange={handleChange}>
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="blogimage">
            <img src={thumbnailPreview} alt="Thumbnail Preview" />
            <div className="file-input-container">
              <input type="file" name='thumbnail' required id="thumbnail-input" className="file-input" onChange={onInputChange} />
              <label htmlFor="thumbnail-input" className="file-input-label">Choose Thumbnail</label>
            </div>
          </div>
        </div>
        <div className='blog-input'>
          <div className="countchars">
            {countCharacters(title)} / 80 characters
          </div>
          <div className='blogpublish'>
            <input type="text" maxLength={80} minLength={30} name='title' value={title} required placeholder='Title' onChange={onInputChange} />
            <button><IoSend /></button>
            <div className='hoverpublish'>
              <span>Publish</span>
            </div>
          </div>
          <ReactQuill
            theme="snow"
            className='textcreate'
            ref={editorRef}
            style={{
              backgroundColor: "white",
              height: "60vh",
              width: '100%',
              border: 'none',
              outline: 'none',
            }}
            value={editorHtml}
            name='description'
            onChange={(content) => handleEditorChange(content)}
            modules={modules}
            formats={formats}
          />
          <div className='countchars'>{editorLength} / 1000 characters</div>
        </div>
      </form>
      <br /><br /><br />
    </div>
  );
}

export default CreateBlog